import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

export default async function Home() {
  const user = await getMe();

  console.log(user);

  return (
    <div>
      <h2>Home</h2>

      <Button size={"lg"} variant={"destructive"}>Click Me!</Button>
    </div>
  );
}
