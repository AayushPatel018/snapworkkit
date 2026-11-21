export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  toolHref: string;
  toolLabel: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "compress-photo-20kb-50kb-exam-form",
    title: "How to Compress Photo & Signature to 20KB or 50KB for Online Exam Forms",
    category: "Image Guide",
    readTime: "4 min read",
    summary:
      "Step-by-step guide to reducing photo and signature file size for college, entrance, and recruitment portals without losing clarity.",
    toolHref: "/tools/image-compressor",
    toolLabel: "Open Exam Image Compressor",
    sections: [
      {
        heading: "Why Exam Portals Reject Large Photo Files",
        paragraphs: [
          "Most online application and admission portals enforce strict size limits such as 20KB, 50KB, or 100KB for passport photos and signatures. Modern smartphone cameras produce multi-megabyte images that fail upload validation immediately.",
          "Instead of cropping out important details blindly, adjusting image dimensions and JPEG compression quality helps hit target file sizes while keeping facial features and signatures legible.",
        ],
      },
      {
        heading: "Best Practices Before Uploading Your Photo",
        paragraphs: [
          "Use good lighting with a plain background and keep your head and shoulders centered. Make sure your signature is written with dark ink on plain white paper.",
          "Always preview the compressed image and verify both file size and visual clarity before submitting your final application form.",
        ],
      },
    ],
  },
  {
    slug: "merge-and-split-pdf-safely",
    title: "How to Merge, Split, Number, and Rotate PDFs Directly in Your Browser",
    category: "PDF Guide",
    readTime: "4 min read",
    summary:
      "Learn how to combine multiple mark sheets or documents, extract specific page ranges, and add page numbers cleanly.",
    toolHref: "/tools/merge-pdf",
    toolLabel: "Open Merge PDF Tool",
    sections: [
      {
        heading: "Organizing Documents for Applications & Submissions",
        paragraphs: [
          "Students and job applicants frequently need to combine certificates, ID proofs, and assignments into one PDF file, or extract only a few pages from a large document.",
          "Browser-based PDF utilities let you merge multiple PDFs in order, extract page ranges like 1, 3-5, remove unwanted pages, or add page numbers in seconds.",
        ],
      },
      {
        heading: "Checking Page Order Before Sharing",
        paragraphs: [
          "Scanned documents sometimes end up rotated sideways or in reverse page order. Fixing rotation and page sequence before sending ensures reviewers can read every page effortlessly.",
        ],
      },
    ],
  },
  {
    slug: "calculate-75-percent-attendance-and-cgpa",
    title: "How to Track 75% College Attendance & Convert CGPA to Percentage",
    category: "Student Guide",
    readTime: "5 min read",
    summary:
      "Plan classes safely around the 75% attendance rule and convert semester CGPA into percentage quickly.",
    toolHref: "/tools/attendance-calculator",
    toolLabel: "Open 75% Attendance Calculator",
    sections: [
      {
        heading: "Planning Around the 75% Attendance Threshold",
        paragraphs: [
          "Tracking attended versus total conducted classes early in the semester prevents last-minute attendance shortages before exams.",
          "Knowing how many consecutive classes you must attend to reach 75%—or how many you can safely miss while staying above 75%—helps you plan leaves responsibly.",
        ],
      },
      {
        heading: "Understanding CGPA to Percentage Conversion",
        paragraphs: [
          "Different universities and grading scales use specific conversion multipliers or formulas. Always check your institution's official circular alongside quick estimates when filling forms.",
        ],
      },
    ],
  },
  {
    slug: "generate-effective-ai-prompts-for-study-and-code",
    title: "How to Write Clear AI Prompts for Coding, Concept Revision & Study",
    category: "AI & Dev Guide",
    readTime: "4 min read",
    summary:
      "Structure prompts with clear context, constraints, and desired output format to get accurate coding and study help.",
    toolHref: "/prompts",
    toolLabel: "Open AI Prompt Generator",
    sections: [
      {
        heading: "Give Clear Context and Expected Output",
        paragraphs: [
          "Vague prompts often produce generic answers. Specifying your tech stack, goal, edge cases, and preferred explanation style leads to much more practical responses.",
          "For study revision, asking for step-by-step breakdowns, examples, and quick self-check questions makes learning faster and easier to retain.",
        ],
      },
      {
        heading: "Review and Test Every Output",
        paragraphs: [
          "Treat AI-generated code and study notes as a starting draft. Always test code in your editor and cross-check formulas or definitions against course notes.",
        ],
      },
    ],
  },
];