"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/loading";
import { ReactSVG } from "react-svg";
import Image from "next/image";

interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}

const GITHUB_REPO = "MohammadMosavat/donkey-type";

const goals = [
    {
        title: "Distraction-Free Practice",
        description:
            "A clean, minimal typing test with focus mode, blind effects, and customizable UI so nothing gets between you and your typing speed.",
        icon: "/svgs/cursor.svg",
    },
    {
        title: "Track Real Progress",
        description:
            "Every test is saved to your profile — WPM, accuracy, and history — so you can see improvement over time, not just a single score.",
        icon: "/svgs/calendar.svg",
    },
    {
        title: "Open Source & Community Driven",
        description:
            "Built in the open. Anyone can contribute features, fix bugs, or suggest improvements on GitHub.",
        icon: "/svgs/theme.svg",
    },
];

const AboutUsPage = () => {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.documentElement.className =
            localStorage.getItem("theme") ?? "theme-indigo-emerald";

        const fetchContributors = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${GITHUB_REPO}/contributors`
                );
                if (response.ok) {
                    const data: Contributor[] = await response.json();
                    setContributors(data);
                }
            } catch (error) {
                console.log("Failed to fetch contributors.");
            } finally {
                setLoading(false);
            }
        };

        fetchContributors();
    }, []);

    return (
        <div className="w-full flex flex-col gap-12 px-4 md:px-0 pb-16">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap gap-4 w-full items-center"
            >
                <Image src={'/svgs/logo/logo.svg'} width={298} height={128} alt="" />
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl md:text-4xl font-JetBrainsMono text-primary">
                        About Donkey Type
                    </h1>
                    <p className="text-sm md:text-base font-JetBrainsMono text-primary text-justify">
                        Donkey Type is a fast, minimal typing speed test built for people
                        who want to actually improve — not just watch a number flash on
                        screen. It's open source, actively developed, and shaped by
                        feedback from the people who use it.
                    </p>
                </div>
            </motion.section>

            <section className="flex flex-col gap-6">
                <h2 className="text-xl md:text-2xl font-JetBrainsMono text-primary">
                    Our Goals
                </h2>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal, index) => (
                        <motion.li
                            key={goal.title}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex gap-4 items-start bg-glass rounded-xl p-4"
                        >
                            <ReactSVG
                                src={goal.icon}
                                className="[&>div>svg]:size-6 shrink-0 mt-1 [&_*]:stroke-primary"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-base md:text-lg font-JetBrainsMono text-primary">
                                    {goal.title}
                                </p>
                                <p className="text-xs md:text-sm font-JetBrainsMono text-primary text-justify">
                                    {goal.description}
                                </p>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </section>

            <section className="flex flex-col gap-6">
                <h2 className="text-xl md:text-2xl font-JetBrainsMono text-primary">
                    Contributors
                </h2>
                {loading ? (
                    <Loading />
                ) : contributors.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {contributors.map((contributor) => (
                            <motion.li
                                key={contributor.login}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.25 }}
                            >
                                <a
                                    href={contributor.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 bg-glass rounded-xl p-4 hover:opacity-80 transition-opacity"
                                >
                                    <img
                                        src={contributor.avatar_url}
                                        alt={contributor.login}
                                        className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-primary/30"
                                    />
                                    <p className="text-xs md:text-sm font-JetBrainsMono text-primary text-center break-all">
                                        @{contributor.login}
                                    </p>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm font-JetBrainsMono text-primary/70">
                        No contributors found.
                    </p>
                )}
            </section>

            <section className="flex flex-col gap-3 max-w-2xl">
                <h2 className="text-xl md:text-2xl font-JetBrainsMono text-primary">
                    Get Involved
                </h2>
                <p className="text-sm md:text-base font-JetBrainsMono text-primary text-justify">
                    Donkey Type is open source on GitHub. Bug reports, feature ideas,
                    and pull requests are always welcome.
                </p>
                <a
                    href={`https://github.com/${GITHUB_REPO}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-sm md:text-base font-JetBrainsMono text-primary underline underline-offset-4"
                >
                    View the repository on GitHub →
                </a>
            </section>
        </div >
    );
};

export default AboutUsPage;