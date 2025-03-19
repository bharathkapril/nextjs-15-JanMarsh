import { prisma } from "@/app/utils/db";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{ id: string }>;

const IdPage = async ({ params }: { params: Params }) => {
  const data = await getData((await params).id);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link className={buttonVariants({ variant: "secondary" })} href="/">
        Back to posts
      </Link>

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium">{data.authorName}</p>
          </div>
          <time className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(data.createdAt)}
          </time>
        </div>
      </div>
      <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <Card>
        <CardContent>
          <p className="text-gray-700">{data.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdPage;
