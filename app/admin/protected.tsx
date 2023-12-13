import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageLoading from "@/components/adminComponents/PageLoading/PageLoading";

interface ProtectedAdminProps {
  children: ReactNode;
}

const ProtectedAdmin: React.FC<ProtectedAdminProps> = ({ children }) => {
  const {data:session, status}: any = useSession()
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <PageLoading />
      </div>
    );
  }

  if (status === "authenticated" && session?.user?.role === "admin") {
    return <>{children}</>;
  } else {
    router.push("/login");
    return null;
  }
};

export default ProtectedAdmin;
