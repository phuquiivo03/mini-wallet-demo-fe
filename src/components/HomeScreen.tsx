"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PhoneScreen from "./Phone";
import StoreProvider from "@/store/provider";
import { getServerHealth } from "@/lib/api";

export default function HomeScreen() {
  const [serverHealth, setServerHealth] = useState(false);
  const [screens, setScreens] = useState<number[]>([]);
  async function handleAddDevice() {
    setScreens([...screens, 1]);
  }

  async function copyChip(phone: string, pass: string) {
    const text = `Phone: ${phone}\nPassword: ${pass}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // clipboard may be unavailable; fail silently
    }
  }

  useEffect(() => {
    getServerHealth()
      .then((res) => {
        setServerHealth(true);
      })
      .catch(() => {
        setServerHealth(false);
      });
  }, []);

  return (
    <main className="page">
      <section className="toolbar">
        <div className="topbar">
          <div className="heading-block">
            <h1>Accounts management</h1>
            <p>Preview and test how login looks on each connected device.</p>
          </div>
          <button
            onClick={handleAddDevice}
            className="add-device-btn"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add device
          </button>
        </div>

        <div className="test-panel">
          <div className="flex justify-between">
            <div className="test-panel-head">
              <span className="dot"></span>
              <span>
                Test accounts &mdash; use these to sign in on any device
              </span>
            </div>
            <div className="">
              <div className="test-panel-head">
                <span
                  className={`dot animate-pulse ${serverHealth ? "" : "bg-red-400!"}`}
                ></span>
                <span>Server health</span>
              </div>
            </div>
          </div>
          <div className="accounts-row">
            <div className="account-chip">
              <div className="fields">
                <div className="field-row">
                  <span className="field-label">Phone</span>
                  <span className="field-value">0987654321</span>
                </div>
                <div className="field-row">
                  <span className="field-label">Password</span>
                  <span className="field-value">123456789</span>
                </div>
              </div>
              <button
                className="copy-btn"
                type="button"
                onClick={() => {}}
                title="Copy credentials"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="9" y="9" width="12" height="12" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
            <div className="account-chip">
              <div className="fields">
                <div className="field-row">
                  <span className="field-label">Phone</span>
                  <span className="field-value">0987654322</span>
                </div>
                <div className="field-row">
                  <span className="field-label">Password</span>
                  <span className="field-value">123456789</span>
                </div>
              </div>
              <button
                className="copy-btn"
                type="button"
                onClick={() => {
                  copyChip("0987654322", "123456789");
                }}
                title="Copy credentials"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="9" y="9" width="12" height="12" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex gap-10 flex-wrap">
        {screens.map((screen, index) => (
          <StoreProvider key={index}>
            <PhoneScreen index={index} />
          </StoreProvider>
        ))}
        <div className="device-card ghost" onClick={handleAddDevice}>
          <div className="ghost-inner">
            <span className="plus-circle">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            <span>Add another device</span>
          </div>
        </div>
      </section>
    </main>
  );
}
