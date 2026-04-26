import { Project } from '../model/project.model.js';
import { Reputation } from '../model/reputation.model.js';
import { Badge } from '../model/badge.model.js';
import { getCachedJson, setCachedJson, invalidateCache } from '../service/cacheUtils.js';
import { createETag } from '../service/encryption.js';

export const createProject = async (req, res, next) => {
    try {
        const { title, description, techStack, teamSize, roles } = req.body;
        const creator = req.user?.id;

        const project = new Project({
            title,
            description,
            creator,
            techStack,
            teamSize,
            roles,
            members: [{ user: creator, role: 'leader' }],
        });

        await project.save();
        await invalidateCache('projects:all');
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        next(error);
    }
};

export const getProjects = async (req, res, next) => {
    try {
        const cacheKey = 'projects:all';
        const cached = await getCachedJson(cacheKey);
        if (cached) {
            const etag = createETag(cached);
            if (req.headers['if-none-match'] === etag) {
                return res.status(304).end();
            }
            res.set('ETag', etag);
            return res.json(cached);
        }

        const projects = await Project.find().populate('creator', 'email username').populate('members.user', 'email username');
        const payload = projects.map((project) => project.toObject());
        await setCachedJson(cacheKey, payload, 120);

        const etag = createETag(payload);
        res.set('ETag', etag);
        res.json(payload);
    } catch (error) {
        next(error);
    }
};

export const joinProject = async (req, res, next) => {
    try {
        const { projectId, role } = req.body;
        const userId = req.user?.id;

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const alreadyJoined = project.members.some(member => member.user.toString() === userId);
        if (alreadyJoined) return res.status(400).json({ message: 'Already joined' });

        project.members.push({ user: userId, role });
        await project.save();
        await invalidateCache('projects:all');

        res.json({ message: 'Joined project successfully' });
    } catch (error) {
        next(error);
    }
};

export const completeProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const userId = req.user?.id;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const leaderMember = project.members.find((member) => member.role === 'leader');
        if (!leaderMember || leaderMember.user.toString() !== userId) {
            return res.status(403).json({ message: 'Only project leader can complete this project' });
        }

        project.status = 'completed';
        project.completedAt = new Date();
        await project.save();
        await invalidateCache('projects:all');

        for (const member of project.members) {
            const badge = new Badge({
                user: member.user,
                project: projectId,
                type: member.role === 'leader' ? 'leadership' : 'completion',
                title: `Project ${project.title} Completed`,
                description: `Completed role: ${member.role}`,
            });
            await badge.save();

            let rep = await Reputation.findOne({ user: member.user });
            if (!rep) {
                rep = new Reputation({ user: member.user });
            }
            rep.projectsCompleted += 1;
            rep.totalProjects += 1;
            rep.completionRate = (rep.totalProjects === 0) ? 0 : (rep.projectsCompleted / rep.totalProjects) * 100;
            if (member.role === 'leader') rep.leadershipCount += 1;
            await rep.save();
        }

        res.json({ message: 'Project completed and badges awarded' });
    } catch (error) {
        next(error);
    }
};