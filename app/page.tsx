"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScreen from "./components/LandingScreen";
import KlusForm, { type PersonalData } from "./components/KlusForm";
import SuccessScreen from "./components/SuccessScreen";

type Screen = "landing" | "form" | "success";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [prefill, setPrefill] = useState<PersonalData | undefined>(undefined);
  const [wantsAnother, setWantsAnother] = useState(false);

  function handleFormSuccess(personal: PersonalData, another: boolean) {
    setPrefill(personal);
    setWantsAnother(another);
    setScreen("success");
  }

  function handleAnotherKlus() {
    // Keep prefill, go back to form
    setScreen("form");
  }

  function handleGoHome() {
    setPrefill(undefined);
    setWantsAnother(false);
    setScreen("landing");
  }

  return (
    <main>
      <AnimatePresence mode="wait">
        {screen === "landing" && (
          <LandingScreen key="landing" onStart={() => setScreen("form")} />
        )}
        {screen === "form" && (
          <KlusForm
            key="form"
            prefill={prefill}
            onSuccess={handleFormSuccess}
            onBack={handleGoHome}
          />
        )}
        {screen === "success" && (
          <SuccessScreen
            key="success"
            wantsAnother={wantsAnother}
            onAnother={handleAnotherKlus}
            onHome={handleGoHome}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
