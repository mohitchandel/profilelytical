"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ToneSelect, { ToneType } from "../components/ToneSelect";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useChat } from "ai/react";
import PlatformSelect, { PlatformTypes } from "@/components/PlatformSelect";
import { platform } from "os";

export default function Page() {
  const [bio, setBio] = useState("");
  const [tone, setTone] = useState<ToneType>("Professional");
  const [platform, setPlatform] = useState<PlatformTypes>("LinkedIn");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        tone,
        bio,
      },
      onResponse() {
        scrollToBios();
      },
    });

  const onSubmit = (e: any) => {
    setBio(input);
    handleSubmit(e);
  };

  const lastMessage = messages[messages.length - 1];
  const generatedBios =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    <div className="flex  mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your next Twitter and LinkedIn bio using chatGPT
        </h1>
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium">
              Write a few sentences about yourself.
            </p>
          </div>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. Senior Developer @Goole. talking about web development, AI, and Blockchain."
            }
          />
          <div className="flex mt-5 items-center space-x-3">
            <p className="text-left font-medium">Select your tone.</p>
          </div>
          <div className="block">
            <ToneSelect tone={tone} setTone={(newTone) => setTone(newTone)} />
          </div>

          <div className="flex mt-5 items-center space-x-3">
            <p className="text-left font-medium">Select platform.</p>
          </div>
          <div className="block">
            <PlatformSelect
              platform={platform}
              setPlatform={(newPlatform) => setPlatform(newPlatform)}
            />
          </div>

          {!isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              type="submit"
            >
              Generate your bio &rarr;
            </button>
          )}
          {isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <span className="loading">
                <span style={{ backgroundColor: "white" }} />
                <span style={{ backgroundColor: "white" }} />
                <span style={{ backgroundColor: "white" }} />
              </span>
            </button>
          )}
        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <output className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your generated bios
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split("2.")
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Bio copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </output>
      </main>
      <Footer />
    </div>
  );
}
