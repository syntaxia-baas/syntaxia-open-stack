import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full h-screen mx-auto text-center ">
      <main className="p-4">
        <Image
          className="mx-auto"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="my-6 space-y-4">
          <li>
            Get started by editing <code>app/page.tsx Web Application</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <Button variant="default">Open Button</Button>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
