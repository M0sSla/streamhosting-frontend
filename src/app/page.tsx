'use client';


import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/common/Button";


export default function Home() {
  const t = useTranslations('home');

  return (
    <div>
      <Button>{t('streamsHeading')}</Button>
      <Button variant={"outline"}>{t('streamsHeading')}</Button>
      <Button variant={"secondary"}>{t('streamsHeading')}</Button>
      <Button variant={"ghost"}>{t('streamsHeading')}</Button>
    </div>
  );
}
