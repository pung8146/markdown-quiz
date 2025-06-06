"use client";

import { useState } from "react";
import { demoQuizzes } from "@/lib/demoData";

interface SampleMarkdownSelectorProps {
  onSelectSample: (content: string) => void;
  className?: string;
}

export default function SampleMarkdownSelector({
  onSelectSample,
  className = "",
}: SampleMarkdownSelectorProps) {
  const [selectedSample, setSelectedSample] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelectSample = (sampleId: string) => {
    const sample = demoQuizzes.find((quiz) => quiz.id === sampleId);
    if (sample) {
      setSelectedSample(sampleId);
      onSelectSample(sample.content);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, sampleId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelectSample(sampleId);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`bg-green-50 border border-green-200 rounded-lg ${className}`}
    >
      {/* 토글 헤더 */}
      <button
        onClick={toggleExpanded}
        className="w-full p-4 sm:p-6 text-left rounded-lg hover:bg-green-100 transition-colors"
        aria-expanded={isExpanded}
        aria-controls="sample-content"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-green-900 text-base sm:text-lg">
              📋 샘플 문서 선택
            </h3>
            <p className="text-sm sm:text-base text-green-700 mt-1">
              미리 준비된 샘플 문서를 선택하여 바로 퀴즈를 체험해보세요!
            </p>
          </div>
          <div className="ml-4">
            <svg
              className={`w-5 h-5 text-green-600 transition-transform duration-200 ${
                isExpanded ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* 확장 가능한 콘텐츠 */}
      <div
        id="sample-content"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {demoQuizzes.map((quiz) => (
              <button
                key={quiz.id}
                onClick={() => handleSelectSample(quiz.id)}
                onKeyDown={(e) => handleKeyDown(e, quiz.id)}
                className={`p-3 sm:p-4 text-left rounded-lg border transition-all hover:shadow-md ${
                  selectedSample === quiz.id
                    ? "bg-green-100 border-green-300 ring-2 ring-green-200 shadow-md"
                    : "bg-white border-green-200 hover:bg-green-50 hover:border-green-300"
                }`}
                tabIndex={isExpanded ? 0 : -1}
                aria-label={`${quiz.title} 샘플 선택`}
              >
                <h4 className="font-medium text-green-900 text-sm sm:text-base mb-2">
                  {quiz.title}
                </h4>
                <p className="text-xs sm:text-sm text-green-600 line-clamp-2 sm:line-clamp-3 mb-3">
                  {quiz.content
                    .split("\n")
                    .find((line) => line.trim() && !line.startsWith("#"))
                    ?.substring(0, 80) || quiz.content.substring(0, 80)}
                  ...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-500">
                    {Math.ceil(quiz.content.length / 100)}분 분량
                  </span>
                  {selectedSample === quiz.id && (
                    <span className="text-xs sm:text-sm text-green-600 font-medium">
                      ✓ 선택됨
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 sm:p-4 bg-green-100 rounded-lg">
            <p className="text-xs sm:text-sm text-green-700">
              💡 <strong>팁:</strong> 샘플을 선택하면 에디터에 자동으로 내용이
              입력됩니다. 내용을 수정한 후 퀴즈를 생성해보세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
