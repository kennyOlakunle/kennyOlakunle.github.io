---
title: "TinyLlama LLM: A Step-by-Step Guide to Implementing the 1.1B Model on Google Colab"
description: "LLM, or Large Language Model, is an advanced artificial intelligence program designed for..."
publishedAt: "2024-01-06T18:13:42Z"
featured: false
sourceName: "DEV Community"
sourceUrl: "https://dev.to/_ken0x/tinyllama-llm-a-step-by-step-guide-to-implementing-the-11b-model-on-google-colab-1pjh"
tags:
  - "article"
---

> Originally published on [DEV Community](https://dev.to/_ken0x/tinyllama-llm-a-step-by-step-guide-to-implementing-the-11b-model-on-google-colab-1pjh).

LLM, or Large Language Model, is an advanced artificial intelligence program designed for understanding, generating, and working with human language. It's trained on a vast array of text data, allowing it to assist in tasks like answering questions, writing essays, translating languages, and even creative writing. They can be used in various applications, from chatbots to research tools, due to their ability to understand context and generate coherent and contextually relevant responses.

In this tutorial, you’ll learn the following:

- Introduction and Overview of TinyLlama

- Understanding the System requirements

- Step-by-Step implementation




## Introduction
TinyLlama emerges as a standout choice in the rapidly evolving landscape of language model technology. This guide is crafted for data scientists, AI enthusiasts, and curious learners, aiming to demystify the deployment of the 1.1 billion parameter TinyLlama model. With its unique blend of power and compactness, TinyLlama reshapes expectations in machine learning, offering versatility for both local and cloud-based environments like Google Colab. 
After reading this article, you'll gain insights into setting up and leveraging TinyLlama on Google Colab for your projects or explorations. We'll provide a detailed roadmap for maximizing TinyLlama's capabilities across different use cases. All resources and tools referenced are linked at the conclusion for your convenience.

### Overview of the TinyLlama and its significance
TinyLlama is more than just an AI model; it's a beacon of innovation in generative AI. Trained on a staggering 3 trillion tokens, it showcases a seamless integration with numerous projects based on the Llama framework. TinyLlama's compact yet robust architecture, featuring only 1.1 billion parameters, makes it an ideal solution for applications with limited computational resources. 
Notably, it shares the same architecture and tokenizer as Llama 2, ensuring high-quality and consistent performance. One notable use case of TinyLlama is in content generation, where its efficiency and accuracy have been greatly valued.

> 
The TinyLlama project aims to pre-train a 1.1B Llama model on 3 trillion tokens. We can achieve this with proper optimization within "just" 90 days using 16 A100-40G GPUs 🚀🚀 - TinyLlama Team.

### Understanding the Technical Requirements
As I dive into Large Language Models (LLMs) through TinyLlama, I must mention the basic tools and environment setups, especially for those using macOS (I use MacBook Pro M1). Though the installations are similar, I will use macOS for the tutorial. 
Let me walk you through some key installations and their purposes:

**Firstly, Python**. This versatile programming language is the backbone of many applications, including data analysis and machine learning. The easiest way to install Python on macOS is through Homebrew. Simply open Terminal and type `brew install python`. If Homebrew isn't your thing, you can directly download Python from [python.org](https://www.python.org/downloads/)

**Next up, Jupyter Notebook**. This is a fantastic tool for anyone involved in coding, data science, or just wanting to experiment with Python. It lets you create documents with live code and visualizations. I installed Jupyter on my Mac using Python's package manager by running a `pip install notebook` in the Terminal. Launching it is as simple as typing `jupyter notebook`. Another way to install and use python is through [Anaconda](https://docs.anaconda.com/free/anaconda/getting-started/index.html). Click on the link and follow the steps.

**Google Colab is another gem**. It's a cloud service offering a Jupyter Notebook environment without any setup. It's particularly handy for sharing projects and accessing GPUs for free. Access it by visiting [Google Colab](colab.research.google.com)

### Some other technical requirements:
**System Memory:** 550MB minimum.
**RAM:** Up to 3.8GB for optimal performance.
**Platform:** Compatible with Google Colab and local setups using VScode with Jupyter Notebook or a Python file.
**Google Account:** Required for Google Colab access.
**Google Colab Versions:** Free version for development (CPU & GPU) and a Pro version for intensive computation.

With these tools and tips, setting up a robust and flexible environment for working with LLM on a macOS system becomes a smooth and efficient process.

### Step-by-Step Implementation Guide
Using Colab, I will start with the CPU. To switch between both runtime environments, go to the right-hand side of the interface. You should see something like Connect. Click on it, and you will see the image below, select change runtime type, and a modal will pop up, then select the runtime you need, either CPU or GPU. You can use any of these for this tutorial.

![Change runtime environment](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oqv1iw71qirfp3qfi8tg.png)


![Select CPU or T4 GPU environment](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fyiatkg16qveliep428g.png)

After this, we can install the tools and libraries we need.

#### Implementation/Method 1
```
!CMAKE_ARGS="-DLLAMA_BLAS=ON -DLLAMA_BLAS_VENDOR=OpenBLAS" pip install llama-cpp-python
```

```
!pip3 install huggingface-hub

```

Note: 

```
!CMAKE_ARGS="-DLLAMA_BLAS=ON -DLLAMA_BLAS_VENDOR=OpenBLAS" pip install llama-cpp-python
```

We needed to use this because it will build `llama.cpp` from the source using cmake and your system's c compiler (required) and install the library alongside this Python package. These backends are supported by llama-cpp-python and can be enabled by setting the CMAKE_ARGS environment variable before installing.

Let's install the model needed for this task. We are using the recently launched 1.1B parameter V1.0 Chat Completion model.

```
!huggingface-cli download TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf --local-dir . --local-dir-use-symlinks False
```

The next step is to import the Python Bindings for `llama.cpp`

```
from llama_cpp import Llama
```
Next is configuring the LLM from Llama, including the model path and other required parameters.

```
llm = Llama(model_path="./tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf",
            n_ctx=2048,
            n_threads=8,
            n_gpu_layers=35)

```

The final step for this method is to call and use the chat completion function.

```

llm.create_chat_completion(
      messages = [
        {
          "role": "system",
          "content": "You are story writing assistant"
          
        },
        {
          "role": "user",
          "content": "Write an extensive story about Life as a young Adult"
        }
      ]
)

```
That's it! The implementation is as simple as that.

If you followed this tutorial step by step, running the above should return the response in the image below, including the full content returned.


![Response](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cjkrm0pshwgqfsmct0tb.png)

The response will also include other details of the result.

```
'finish_reason': 'length'}],
'usage': {'prompt_tokens': 36,
'completion_tokens': 476, 'total_tokens': 512}}

```

The full code is below, and I will add the GitHub link to the project at the end of this article.


![Full code to method 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o6g0pi6ri4a510w66vah.png)



#### Implementation/Method 2
I will add all the code needed here, and then you can run it locally or in Google Colab. It's almost the same process with a slight difference.

```
#There is always an issue of "ImportError: Using `low_cpu_mem_usage=True` or a `device_map` requires Accelerate: `pip install accelerate`"
#so use the command below to install accelerare from the package manager.


!pip -qqq install bitsandbytes accelerate


import torch
from transformers import pipeline

pipe = pipeline("text-generation", model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", torch_dtype=torch.bfloat16, device_map="auto")

# We use the tokenizer's chat template to format each message - see https://huggingface.co/docs/transformers/main/en/chat_templating
messages = [
    {
        "role": "system",
        "content": "You are a friendly chatbot who always responds in the style of a pirate",
    },
    {"role": "user", "content": "How many helicopters can a human eat in one sitting?"},
]
prompt = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
outputs = pipe(prompt, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
print(outputs[0]["generated_text"])

```
If you follow the process above, you should get a result with the entire content that looks like the one below.


![Method 2 result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gk0sbpvy3wewupmd4i1u.png)


[GitHub link](https://github.com/kennyOlakunle/TinyLlama_local_implementation)

### Conclusion
In conclusion, TinyLlama indicates the advancements in AI, balancing high performance with resource efficiency. Its 1.1 billion parameters make it suitable for diverse applications, from Google Colab to local setups, ensuring user-friendly implementation for newcomers and veterans alike. The minimal hardware requirements enhance its accessibility, opening doors to innovative AI interactions and applications in various fields. This guide has highlighted TinyLlama's practical utility in chat completions and other AI tasks, supported by a robust community on platforms like GitHub and HuggingFace. As we continue to witness the evolution of AI, TinyLlama exemplifies a practical and powerful tool in this journey, making advanced machine-learning models more accessible to a broader audience.


Thank you for reading! 🦙🦙🦙🚀🚀🚀

Keep learning and Happy Coding!

You can find me on [LinkedIn](https://www.linkedin.com/in/kehindeabe/) and [Twitter(X)](https://twitter.com/_Ken0x)

## References
[TinyLlama GitHub project](https://github.com/jzhang38/TinyLlama?tab=readme-ov-file)

[TinyLlama-1.1B-Chat-v1.0 on HuggingFace](https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0)

[TinyLlama Base](https://huggingface.co/TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T)

[Python Bindings for llama.cpp](https://github.com/abetlen/llama-cpp-python)

[TinyLlama Playground](https://huggingface.co/spaces/PY007/TinyLlama-Chat)
