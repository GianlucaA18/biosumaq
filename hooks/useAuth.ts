import { getUserFromCookie } from "@/api/login/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
    const [correo, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const correo = await getUserFromCookie();
            if (!correo) {
                router.replace('/login');
            } else {
                setUser(correo);
            }
            setLoading(false);
        };

        checkUser();
    }, [router]);

    return { correo, loading };
}
