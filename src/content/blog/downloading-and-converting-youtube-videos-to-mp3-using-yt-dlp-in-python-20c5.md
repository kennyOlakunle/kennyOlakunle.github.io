---
title: "Downloading and Converting YouTube Videos to MP3 using yt-dlp in Python"
description: "The popularity of video content on websites like YouTube has increased user demand for audio..."
publishedAt: "2024-10-06T22:14:48Z"
featured: false
sourceName: "DEV Community"
sourceUrl: "https://dev.to/_ken0x/downloading-and-converting-youtube-videos-to-mp3-using-yt-dlp-in-python-20c5"
tags:
  - "python"
  - "automation"
  - "webdev"
  - "coding"
---

> Originally published on [DEV Community](https://dev.to/_ken0x/downloading-and-converting-youtube-videos-to-mp3-using-yt-dlp-in-python-20c5).

The popularity of video content on websites like YouTube has increased user demand for audio extraction, particularly for podcasts, lectures, and music files. While plenty of web-based options are available for downloading audio, they frequently have restrictions on access, intrusive advertisements, or a decrease. This post explains how to download and convert YouTube videos into MP3 files using Python and yt-dlp, guaranteeing a high-quality result.

## Overview of `yt-dlp`

`yt-dlp` is a powerful, community-driven fork of `youtube-dl`. It includes several enhancements, and optimizations, and supports downloading from a wide range of websites, with a primary focus on YouTube. The tool provides extensive options for video/audio quality, output formats, and file handling. In this article, we'll focus on using `yt-dlp` to extract the best possible audio from YouTube videos and save it in MP3 format.

## Prerequisites

Before diving into the code, you’ll need to ensure that your environment is set up properly.

1. **Python**: Make sure you have Python 3 installed on your machine. You can download it from [Python.org](https://www.python.org/).

2. **yt-dlp**: Install `yt-dlp` using `pip`:

```pip install yt-dlp```

3. **FFmpeg**: For post-processing (i.e., converting audio formats), `FFmpeg` must be installed. It is the core tool used for converting video and audio formats. You can install it via your package manager:

- On macOS (using Homebrew):

```
brew install ffmpeg

```
On Windows: Download the executable from [FFmpeg's official site](https://ffmpeg.org/download.html) and follow the installation instructions.

## Python Script to Download YouTube Videos and Convert to MP3
Here is the Python script that performs the download and conversion of YouTube videos into MP3 format using `yt-dlp` and `FFmpeg`.

```
import yt_dlp
playlist_url = 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID'  
save_path = 'downloads/' 
def download_best_audio_as_mp3(video_url, save_path=save_path):
    ydl_opts = {
        'outtmpl': save_path + '/%(title)s.%(ext)s',  # Save path and file name
        'postprocessors': [{  # Post-process to convert to MP3
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',  # Convert to mp3
            'preferredquality': '0',  # '0' means best quality, auto-determined by source
        }],
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])
download_best_audio_as_mp3(video_url, save_path)
```

### Key Components of the Script:
1. `yt_dlp.YoutubeDL` **Object**: This is the main object provided by `yt-dlp` that allows us to configure how the download is performed. The `ydl_opts` dictionary contains various options:

- `'outtmpl'`: Specifies the output template, including the directory `(save_path)` and filename `(%(title)s)`.
- `'postprocessors'`: This option enables post-processing of the downloaded content, in this case, extracting audio and converting it to MP3 format.
- `'preferredcodec'`: Specifies the codec for the audio conversion, which is set to MP3.
- `'preferredquality'`: A value of `'0'` ensures that the best possible quality is selected automatically.

2. **Downloading and Conversion**: The `download` method accepts a list of video URLs, allowing multiple videos to be processed. In our example, we pass a single YouTube video URL.

3. **MP3 Conversion**: After the `download`, the postprocessor `(FFmpegExtractAudio)` converts the audio to MP3 format using `FFmpeg`. The `preferredquality` option ensures the highest available audio quality is used.

### Customizing the Script

- **Adjusting the Save Path**: You can modify the `save_path` variable to store the downloaded MP3 files in a different location:

```
save_path = '/path/to/your/folder/'

```
- **Downloading a Playlist**: To download a full playlist, simply provide the playlist URL instead of a single video URL. `yt-dlp` will automatically handle the playlist and download each video sequentially:

```
video_url = 'https://www.youtube.com/playlist?list=PLxyz...'

```


- **Choosing a Different Audio Format**:
If you want a different format (e.g., AAC or WAV), you can change the `'preferredcodec'` value:


```

'preferredcodec': 'aac',  # Convert to AAC format

```


The full code can be found through this [GitHub page](https://github.com/kennyOlakunle/youtubedownload)


## Conclusion
By combining `yt-dlp` and `FFmpeg`, you can easily automate the process of downloading YouTube videos and converting them into high-quality MP3 files with minimal effort. This approach offers flexibility and power over web-based solutions, making it ideal for developers and power users who want to streamline their media processing workflows.
This script can be expanded to include more advanced functionalities like batch processing, downloading subtitles, or selecting specific audio streams. With its modular design and strong community support, `yt-dlp` continues to be one of the most reliable tools for managing multimedia content from the web.
