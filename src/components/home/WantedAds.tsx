"use client";

import { formatDate, getWantedAds } from "@/apis/apicalls";
import { useQuery } from "@tanstack/react-query";
import Container from "../Container";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ProductDetailsLoading } from "@/loading/ProductDetailsLoading";

const WantedAds = () => {
  const { data, isPending } = useQuery({
    queryKey: ["wantedads"],
    queryFn: getWantedAds,
  });

  if (isPending) {
    return <ProductDetailsLoading />;
  }

  return (
    <Container>
      <section className="relative mx-auto my-10 flex w-[600px] flex-col gap-y-5">
        <h1 className="text-center font-black opacity-70">Wanted Ads</h1>

        {(!isPending && !data) ||
          (data?.WantedAds.length === 0 && (
            <p className="mt-10 text-center font-semibold text-destructive">
              No Ads Available
            </p>
          ))}

        <div className="flex w-full flex-col gap-y-5">
          {data &&
            data?.WantedAds?.map((ad: TWantedAd) => (
              <div
                key={ad.id}
                className="flex flex-col gap-y-4 rounded-lg border border-input px-5 py-3 shadow"
              >
                <div className="flex flex-col gap-y-2">
                  <p className="text-sm opacity-80">
                    {formatDate(ad.created_at)}
                  </p>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold opacity-80">{ad.adname}</h2>
                    <Link href={`/user/${ad.user_id}`}>
                      <Button className="flex items-center gap-2">
                        <MessageSquare className="size-5" />
                        Chat
                      </Button>
                    </Link>
                  </div>
                  <p className="flex items-center gap-2 opacity-80">
                    <ChevronRight className="size-5" />
                    {ad.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-80">{ad.user.name}</p>
                  <p className="self-end text-xs opacity-80">
                    {ad.Province} {ad.District}, {ad.Municipality}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </Container>
  );
};

export default WantedAds;
