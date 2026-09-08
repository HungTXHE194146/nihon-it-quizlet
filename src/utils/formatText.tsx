import React from 'react';

/**
 * Parses:
 * 1. Strikethrough markdown syntax (~~word~~) into clean line-through text.
 * 2. Newlines (\n) into explicit <br /> tags so lines always break regardless of CSS whitespace mode.
 */
export function renderFormattedText(text?: string | null): React.ReactNode {
  if (!text) return text ?? null;

  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lineIdx) => {
        const parts = line.split(/(~~.*?~~)/g);
        return (
          <React.Fragment key={lineIdx}>
            {lineIdx > 0 && <br />}
            {parts.map((part, partIdx) => {
              if (part.startsWith('~~') && part.endsWith('~~') && part.length >= 4) {
                const content = part.slice(2, -2);
                return (
                  <span
                    key={partIdx}
                    className="line-through text-slate-400 decoration-slate-400 px-0.5"
                    title={`Gạch bỏ: ${content}`}
                  >
                    {content}
                  </span>
                );
              }
              return part;
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}
