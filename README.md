# Temporal Architect App

This is a time management tool for people who want to make the most of their time.

## Features

-   Get an overview of your week in a calendar view

![calendarview](https://github.com/Zyphdoz/Temporal-Architect-App/assets/19358097/c6df7202-9a9d-4c96-a734-95c5731a4d9e)

-   Get insightful statistics on how you are spending your time

![image](https://github.com/Zyphdoz/Temporal-Architect-App/assets/19358097/5ae2c137-64a6-42d0-aa7d-e40ecd3c4510)

-   Countdown to next task in tab title
-   You can opt-in to desktop nofitications for when the next task starts

This project was inspired by a video on time management. For context on the intended use case of this tool, I recommend checking out the video [here](https://www.youtube.com/watch?v=ImBlQJAMCQY).
After watching the video I wanted to try this out myself but the suggested approach involved using a calendar app, a time tracking app and a spreadsheet. The problem here is that these tools would be slow to use, not only because I'd have to manually move data between them but also because these are general purpose tools designed to handle a lot more than what I'd be using them for, thus their UI and UX would likely not be optimized for my specific use case.
Therefore, I decided to create my own tool that does exactly what I need while requiring minimal time investment and effort to use.

The tool is available on https://zyphdoz.github.io/Temporal-Architect-App or if you prefer to run it locally, you can clone this project and follow the instructions below.

## Running locally

**Initial setup:**
In your project directory, run the first command, wait for dependencies to install, then let pubsubify.js run for a few seconds (two should suffice if you have a fast computer), press `ctrl+c`, then run the second command. The second command assumes your project directory is called "Temporal Architect App".

```
npm i && mkdir ../temporal_architect_app_pubsubify_output/ && mkdir ../temporal_architect_app_pubsubify_output/node_modules && node pubsubify.js
```

```
cd ../temporal_architect_app_pubsubify_output/ && npm i && cd "../Temporal Architect App" && npm run pubsubify
```

You only need to do the above steps once before you run the project for the very first time.
After that you can start the dev server with:

```
npm run pubsubify
```

## For anyone reading the code

This project uses [pubsubify](https://github.com/Zyphdoz/pubsubify), a custom state management system I developed out of curiosity. This is also why many of the components have their state in singletons. Normally this approach wouldn't work because React doesn't know to rerender when the state in these singletons changes, but pubsubify injects some code before the build step that makes this work.
