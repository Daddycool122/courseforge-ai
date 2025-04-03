
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course tutorial on following details with field as Course name , Description along with Chapter name, About ,Duration :\nCategory:Programming, Topic :Kubernetes, Difficulty :Basic,Duration: 1 hours, Noumber of lessons:5 in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Here's my thinking process for generating the Kubernetes tutorial JSON:\n\n1.  **Deconstruct the Request:**\n\n    *   **Format:** JSON. This is the primary output format required.\n    *   **Content Type:** Course Tutorial. This means I need to structure the information like a mini-course outline.\n    *   **Required Fields:**\n        *   `Course name`: A title for the overall course.\n        *   `Description`: A brief overview of what the course covers.\n        *   `Chapter name`: The title for each individual lesson/module.\n        *   `About`: A description of what each specific chapter covers.\n        *   `Duration`: The time allocated for each chapter/lesson.\n    *   **Specific Details:**\n        *   `Category`: Programming (although Kubernetes is more Ops/DevOps, I'll stick to the request).\n        *   `Topic`: Kubernetes.\n        *   `Difficulty`: Basic. This means the content should be introductory, avoiding deep dives or complex configurations.\n        *   `Duration (Total)`: 1 hour (60 minutes).\n        *   `Number of lessons`: 5.\n\n2.  **Plan the Structure (JSON):**\n\n    A good JSON structure for a course would be an object containing course-level details and an array of chapter/lesson objects.\n\n    ```json\n    {\n      \"Course name\": \"...\",\n      \"Category\": \"Programming\",\n      \"Topic\": \"Kubernetes\",\n      \"Difficulty\": \"Basic\",\n      \"Total Duration\": \"1 hour\",\n      \"Description\": \"...\",\n      \"Chapters\": [\n        {\n          \"Chapter name\": \"...\",\n          \"About\": \"...\",\n          \"Duration\": \"...\"\n        },\n        {\n          \"Chapter name\": \"...\",\n          \"About\": \"...\",\n          \"Duration\": \"...\"\n        },\n        // ... 3 more chapters\n      ]\n    }\n    ```\n\n3.  **Flesh out Course-Level Details:**\n\n    *   `Course name`: Needs to be catchy and reflect the basic nature. Something like \"Kubernetes Fundamentals: Your First Hour\" or \"Introduction to Kubernetes Basics\". Let's go with \"Kubernetes Fundamentals: Your First Hour\".\n    *   `Category`: \"Programming\" (as requested).\n    *   `Topic`: \"Kubernetes\".\n    *   `Difficulty`: \"Basic\".\n    *   `Total Duration`: \"1 hour\".\n    *   `Description`: Should explain *what* Kubernetes is at a high level, *why* it's used, and what the student will learn in this introductory hour. \"Get started with Kubernetes, the leading container orchestration platform. This 1-hour basic course introduces core concepts like Pods, Services, and Deployments, explaining why Kubernetes is essential for modern application deployment.\"\n\n4.  **Plan the 5 Lessons (Chapters):**\n\n    *   **Goal:** Introduce basic Kubernetes concepts within 1 hour (60 minutes) across 5 lessons. This means each lesson should be roughly 12 minutes (60 / 5 = 12).\n    *   **Logical Flow (Basic Kubernetes):**\n        1.  **What & Why?** Start with the problem (managing containers at scale) and introduce Kubernetes as the solution. Define core ideas like orchestration.\n        2.  **Core Concepts 1 (Smallest Unit):** Introduce the Pod - the fundamental building block. Maybe mention containers *within* Pods.\n        3.  **Core Concepts 2 (Managing Pods):** How do you create and manage multiple Pods reliably? Introduce Deployments. Explain ReplicaSets implicitly.\n        4.  **Core Concepts 3 (Networking):** How do you access the applications running in Pods? Introduce Services (specifically ClusterIP and maybe NodePort at a high level).\n        5.  **Putting it Together & Next Steps:** Briefly recap the concepts and show how they interact. Mention `kubectl` as the command-line tool and suggest further learning.\n\n5.  **Define Each Chapter's Details:**\n\n    *   **Chapter 1:**\n        *   `Chapter name`: \"What is Kubernetes and Why Use It?\"\n        *   `About`: \"Understand the challenges of container management at scale and how Kubernetes solves them. Learn about container orchestration and the basic benefits of using K8s.\"\n        *   `Duration`: \"10 minutes\" (Slightly shorter to ease in).\n    *   **Chapter 2:**\n        *   `Chapter name`: \"Understanding Pods: The Basic Unit\"\n        *   `About`: \"Dive into the smallest deployable unit in Kubernetes: the Pod. Learn what a Pod represents and its relationship with containers.\"\n        *   `Duration`: \"12 minutes\".\n    *   **Chapter 3:**\n        *   `Chapter name`: \"Managing Applications with Deployments\"\n        *   `About`: \"Learn how Deployments manage application lifecycles, ensuring the desired number of Pods are running and handling updates.\"\n        *   `Duration`: \"13 minutes\" (Slightly longer as Deployments are key).\n    *   **Chapter 4:**\n        *   `Chapter name`: \"Exposing Applications with Services\"\n        *   `About`: \"Discover how Services provide stable network endpoints to access your applications running in Pods, covering basic service types.\"\n        *   `Duration`: \"13 minutes\" (Also crucial).\n    *   **Chapter 5:**\n        *   `Chapter name`: \"Interacting with Kubernetes (kubectl) & Next Steps\"\n        *   `About`: \"Get a brief introduction to `kubectl`, the command-line tool for Kubernetes. Recap key concepts and find out where to go next in your learning journey.\"\n        *   `Duration`: \"12 minutes\".\n\n    *   **Duration Check:** 10 + 12 + 13 + 13 + 12 = 60 minutes (1 hour). Perfect.\n\n6.  **Assemble the JSON:**\n\n    Combine the course details and the chapter details into the planned JSON structure. Double-check syntax (commas, braces, brackets, quotes).\n\n7.  **Review and Refine:**\n\n    *   Does the JSON structure match the request? Yes.\n    *   Are all required fields present? Yes.\n    *   Do the chapter topics flow logically for a basic introduction? Yes.\n    *   Is the total duration met? Yes.\n    *   Is the number of lessons correct? Yes.\n    *   Is the difficulty level appropriate for the content? Yes, it sticks to fundamental concepts.\n    *   Is the language clear and concise? Yes.\n\nThis systematic approach ensures all constraints are met and the resulting JSON is well-structured and informative."},
            {text: "```json\n{\n  \"Course name\": \"Kubernetes Fundamentals: Your First Hour\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Kubernetes\",\n  \"Difficulty\": \"Basic\",\n  \"Total Duration\": \"1 hour\",\n  \"Number of lessons\": 5,\n  \"Description\": \"Get started with Kubernetes, the leading container orchestration platform. This 1-hour basic course introduces core concepts like Pods, Services, and Deployments, explaining why Kubernetes is essential for modern application deployment.\",\n  \"Chapters\": [\n    {\n      \"Chapter name\": \"1. What is Kubernetes and Why Use It?\",\n      \"About\": \"Understand the challenges of container management at scale and how Kubernetes solves them. Learn about container orchestration and the basic benefits of using K8s.\",\n      \"Duration\": \"10 minutes\"\n    },\n    {\n      \"Chapter name\": \"2. Understanding Pods: The Basic Unit\",\n      \"About\": \"Dive into the smallest deployable unit in Kubernetes: the Pod. Learn what a Pod represents and its relationship with containers.\",\n      \"Duration\": \"12 minutes\"\n    },\n    {\n      \"Chapter name\": \"3. Managing Applications with Deployments\",\n      \"About\": \"Learn how Deployments manage application lifecycles, ensuring the desired number of Pods are running and handling updates.\",\n      \"Duration\": \"13 minutes\"\n    },\n    {\n      \"Chapter name\": \"4. Exposing Applications with Services\",\n      \"About\": \"Discover how Services provide stable network endpoints to access your applications running in Pods, covering basic service types.\",\n      \"Duration\": \"13 minutes\"\n    },\n    {\n      \"Chapter name\": \"5. Interacting with Kubernetes (kubectl) & Next Steps\",\n      \"About\": \"Get a brief introduction to `kubectl`, the command-line tool for Kubernetes. Recap key concepts and find out where to go next in your learning journey.\",\n      \"Duration\": \"12 minutes\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // // TODO: Following code needs to be updated for client-side apps.
    // const candidates = result.response.candidates;
    // for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    //   for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
    //     const part = candidates[candidate_index].content.parts[part_index];
    //     if(part.inlineData) {
    //       try {
    //         const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
    //         fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
    //         console.log(`Output written to: ${filename}`);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }
    //   }
    // }
    // console.log(result.response.text());
