import React from "react";

interface Node {
  type: string;
  level?: number;
  format?: string;
  children?: Node[];
  text?: string;
}

export default function RichTextRenderer({ content }: { content: Node[] }) {
  if (!content) return null;

  const renderNode = (node: Node, index: number): React.ReactNode => {
    switch (node.type) {
      case "heading": {
        const level = Math.min(Math.max(node.level || 2, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6;
        const Tag = `h${level}` as const;
        
        return React.createElement(
          Tag,
          { key: index, className: "mt-8 mb-4 text-2xl font-bold" },
          node.children?.map(renderNode)
        );
      }

      case "paragraph":
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {node.children?.map(renderNode)}
          </p>
        );

      case "list": {
        const ListTag = node.format === "ordered" ? "ol" : "ul";
        return React.createElement(
          ListTag,
          { key: index, className: "mb-4 list-disc space-y-1 pl-6 rtl:text-right" },
          node.children?.map(renderNode)
        );
      }

      case "list-item":
        return (
          <li key={index} className="leading-relaxed">
            {node.children?.map(renderNode)}
          </li>
        );

      case "text":
        return node.text;

      default:
        return null;
    }
  };

  return (
    <div dir="rtl" className="prose prose-lg max-w-none">
      {content.map((node, i) => renderNode(node, i))}
    </div>
  );
}
