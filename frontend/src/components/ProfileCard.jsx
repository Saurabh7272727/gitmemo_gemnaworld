import { FaGithub, FaCheckCircle } from "react-icons/fa";

export default function ProfileCard({ profile }) {
    return (
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl flex items-center gap-5 border border-zinc-800">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-x-3 justify-center">
                    <img src={`${profile?.avatar}`} alt="avatar" className="w-[70px] h-[70px] object-cover content-center rounded-2xl overflow-hidden" />
                    {profile?.email}
                    <FaCheckCircle className="text-green-500" />
                </h2>

                <p className="text-zinc-400 flex items-center gap-2 mt-1">
                    <FaGithub />
                    Connected via GitHub App with GitMemo* <span className="text-green-400 tex">{profile?.username}</span>
                </p>

                <p className="text-sm text-zinc-500 mt-2">
                    Installation ID: {profile?.githubId}
                </p>
            </div>
        </div>
    );
}