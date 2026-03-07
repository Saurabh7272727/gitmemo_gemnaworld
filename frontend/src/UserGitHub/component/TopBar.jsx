import { FaGithub } from "react-icons/fa";

export default function TopBar({ githubConnected }) {
    const state = localStorage.getItem('userId');

    return (
        <div className="flex justify-between items-center px-8 py-4 border-b border-zinc-800 bg-zinc-950">

            <h1 className="text-xl font-bold tracking-wide text-white">
                IdeaHub
            </h1>

            <div className="flex items-center gap-6">

                <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition 
          ${githubConnected
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-zinc-800 hover:bg-zinc-700"} text-white`}
                >
                    <FaGithub size={18} />
                    {githubConnected ? "GitHub Connected" :
                        <a href={`https://github.com/apps/gemnaworld/installations/new?state=${state}`}>
                            Connect Github
                        </a>
                    }
                </button>

                <div className="w-10 h-10 bg-zinc-800 rounded-full">

                </div>
            </div>
        </div>
    );
}



{/* <div>AuthHomePage</div>

<a href={`https://github.com/apps/gemnaworld/installations/new?state=${state}`}>
                click me
</a> */}