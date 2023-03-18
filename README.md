# Simple React Native App

## Introduction

This is a simple react native application that displays the weather for a given location.

## Running the app

Do the following to run the app:

```bash
yarn install
npx react-native start
```

Then, in a new terminal window, run:

```bash
npx react-native run-ios
```

(I have done most my dev on iOS)

## Notes

- I have used react-native-navigation for navigation. I included a bottom tab navigator, and a stack navigator for the home screen.
- I tried to structure my code in a way that is easy to understand and maintain, even if it were to grow in size.
- If it were to grow in size a large amount (many many journeys), I would probably have different journeys in their own routes.
- I tried to follow the screens as closely as possible
- I have included an apk build in the root of the project for convenience.
- I also kept my api key in the code for convenience, but I would normally keep it in a .env file and gitignore it. I do know this is not a good practice, but I wanted to make it easy for you to run the app.

## Thank you :)
