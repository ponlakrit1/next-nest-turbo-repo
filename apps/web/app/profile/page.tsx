"use client"

import { Button } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useMemo } from "react";

export default function ProfilePage() {
    const { data: session } = useSession();
    
    const sessionData = useMemo(() => {
        if (!session?.user) return [];

        return [
            { key: 'id', value: session?.user.id },
            { key: 'email', value: session?.user.email },
            { key: 'name', value: session?.user.name },
        ];
    }, [session?.user])

    return (
        <div className="min-h-screen bg-white p-6">
            {/* Top bar */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-zinc-800">
                    Session Information
                </h1>
                <Button
                    onClick={() => signOut({callbackUrl: '/'})}
                    className="btn-danger"
                >
                    Logout
                </Button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-3 text-left font-medium text-neutral-600">
                                Key
                            </th>
                            <th className="border-b px-4 py-3 text-left font-medium text-neutral-600">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessionData.map((item) => (
                            <tr key={item.key} className="hover:bg-neutral-50">
                                <td className="border-b px-4 py-3 font-mono text-neutral-700">
                                    {item.key}
                                </td>
                                <td className="border-b px-4 py-3 text-neutral-800">
                                    {item.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}