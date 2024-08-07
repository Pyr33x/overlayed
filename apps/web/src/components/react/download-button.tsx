import type { ComponentPropsWithoutRef } from "react";
import { Platforms } from "./download.js";
import type { PlatformDownload } from "types";
import { MacIcon, WindowsIcon, LinuxIcon } from "./icons";
import { track } from "@vercel/analytics";
import { Button } from "./button.jsx";

type DownloadButtonParams = {
  platform: PlatformDownload;
  props?: ComponentPropsWithoutRef<"a">;
};

const PlatformIcons = {
  mac: MacIcon,
  windows: WindowsIcon,
  linux: LinuxIcon,
};

export default function DownloadButton({
  platform,
  ...props
}: DownloadButtonParams) {
  const Image = PlatformIcons[platform.platform];
  return (
    <Button size="sm" {...props}>
      <a
        target="_blank"
        href={platform.url}
        className="flex flex-row items-center justify-center gap-2"
        onClick={() => {
          const name = platform.name.includes("canary")
            ? "download-canary"
            : "download";
          track(name, {
            platform: platform.platform,
          });
        }}
      >
        <div className="size-5">
          <Image />
        </div>
        <span className="platform-button-text font-bold z-30">
          Download for {Platforms[platform.platform]}
        </span>
      </a>
    </Button>
  );
}
