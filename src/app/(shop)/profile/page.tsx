import { Title } from "@/components/ui/title/Title";
import { auth } from "../../../../auth.config";
import { redirect } from "next/navigation";


const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/profile');
    redirect('/');
  }

  return (
    <Title title="Perfil" />
  )
}

export default ProfilePage