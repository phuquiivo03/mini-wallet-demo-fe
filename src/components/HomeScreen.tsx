"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhoneScreen from "./Phone";
import StoreProvider from "@/store/provider";

export default function HomeScreen() {
  const [screens, setScreens] = useState<number[]>([]);
  async function handleAddDevice() {
    setScreens([...screens, 1]);
  }

  return (
    <main className="page">
      <section className="toolbar">
        <h1 className="text-2xl font-bold font-momo">Accounts Management</h1>
        <div className="add-account flex items-end">
          <Button type="button" onClick={handleAddDevice}>
            {"+ Add Device"}
          </Button>
        </div>
      </section>

      <section className="flex gap-10 flex-wrap">
        {screens.map((screen, index) => (
          <StoreProvider key={index}>
            <PhoneScreen />
          </StoreProvider>
        ))}
      </section>
    </main>
  );
}
