"use client";
import { useRef, useState } from "react";
import { useChat } from "ai/react";
import toast, { Toaster } from "react-hot-toast";

export const InputArea = () => {
  const path = "https://www.buymeacoffee.com/widget/page/mohitchandel";

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [bio, setBio] = useState<string>("");
  const [tone, setTone] = useState<string>("Professional");
  const [platform, setPlatform] = useState<string>("LinkedIn");

  const inputStyle = {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const { handleSubmit, isLoading, messages } = useChat({
    body: {
      tone,
      bio,
      platform,
    },
    onResponse() {
      scrollToBios();
    },
  });

  const onSubmit = async (e: any) => {
    console.log(e);
    e.preventDefault();
    if (bio == "") {
      toast("Please Fill Bio Field", {
        icon: "😑",
      });
      return;
    }
    handleSubmit(e);
  };

  const lastMessage = messages[messages.length - 1];
  const generatedBios =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    <div className="mt-8">
      <div className="max-w-xl mx-auto my-10">
        <h1 className="text-5xl text-center font-bold">
          Generate your next Twitter and LinkedIn bio using chatGPT
        </h1>
      </div>
      <div className="max-w-xl mx-auto">
        <form onSubmit={onSubmit}>
          <div className="my-2">
            <label
              htmlFor="bio"
              className="block text-md font-medium text-gray-700"
            >
              Paste or Write Your Bio.
            </label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              id="bio"
              name="bio"
              rows={4}
              style={inputStyle}
              className="p-3 w-full rounded-md border-gray-700 shadow-sm focus:border-black focus:ring-black"
              placeholder={
                "e.g. Blockchain Developer @Alchemy. Talks about #web3. I love to write about my life."
              }
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="tone"
              className="block text-md font-medium text-gray-700"
            >
              Select Your Tone.
            </label>
            <select
              style={inputStyle}
              onChange={(e) => setTone(e.target.value)}
              className="p-3 w-full rounded-md border-gray-700 shadow-sm focus:border-black focus:ring-black"
            >
              <option value="Professional">Professional</option>
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Funny">Funny</option>
            </select>
          </div>
          <div className="my-2">
            <label
              htmlFor="platform"
              className="block text-md font-medium text-gray-700"
            >
              Select Platform.
            </label>
            <select
              style={inputStyle}
              onChange={(e) => setPlatform(e.target.value)}
              className="p-3 w-full rounded-md border-gray-700 shadow-sm focus:border-black focus:ring-black"
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
            </select>
          </div>
          <div>
            {isLoading ? (
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
            ) : (
              <button
                type="submit"
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              >
                Generate
              </button>
            )}
          </div>
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
                <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
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
      </div>
    </div>
  );
};
