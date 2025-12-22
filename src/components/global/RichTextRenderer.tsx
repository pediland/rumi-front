"use client";

import { useLocale } from "next-intl";
import React from "react";

import { CheckFatIcon } from "@phosphor-icons/react/dist/ssr";
interface Node {
  type: string;
  level?: number;
  format?: string;
  children?: Node[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  strikethrough?: boolean;
}

export default function RichTextRenderer({ content }: { content: Node[] }) {
  const locale = useLocale();

  if (!content) return null;

  const renderNode = (node: Node, index: number): React.ReactNode => {
    switch (node.type) {
      case "heading": {
        const level = Math.min(Math.max(node.level || 2, 1), 6) as
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6;
        const Tag = `h${level}` as const;
        return React.createElement(
          Tag,
          {
            key: index,
            className: "mt-6 mb-2 text-xl font-semibold first:mt-0",
          },
          node.children?.map(renderNode),
        );
      }

      case "paragraph":
        return (
          <p key={index} className="mb-2 leading-relaxed">
            {node.children?.map(renderNode)}
          </p>
        );

      case "list": {
        const ListTag = node.format === "ordered" ? "ol" : "ul";
        return React.createElement(
          ListTag,
          { key: index, className: "mb-4 list-disc space-y-1 sm:pr-2" },
          node.children?.map(renderNode),
        );
      }

      case "list-item":
        return (
          <li key={index} className="flex items-start gap-2 leading-relaxed">
            <CheckFatIcon
              size={16}
              weight="duotone"
              className="mt-1 shrink-0 text-emerald-600"
            />
            <span>{node.children?.map(renderNode)}</span>
          </li>
        );

      case "text": {
        let textElement: React.ReactNode = node.text;
        if (!textElement) return null;

        if (node.bold)
          textElement = (
            <strong key={index} className="font-medium">
              {textElement}
            </strong>
          );
        if (node.italic) textElement = <em key={index}>{textElement}</em>;
        if (node.underline)
          textElement = (
            <u key={index} className="underline-offset-4">
              {textElement}
            </u>
          );
        if (node.strikethrough)
          textElement = (
            <s key={index} className="text-gray-400">
              {textElement}
            </s>
          );
        if (node.code)
          textElement = (
            <code
              key={index}
              className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm"
            >
              {textElement}
            </code>
          );

        return textElement;
      }

      default:
        return null;
    }
  };

  return (
    <div
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="prose prose-lg max-w-none"
    >
      {content.map((node, i) => renderNode(node, i))}
    </div>
  );
}
