# FundWise - Crowdfunding Platform

Welcome to FundWise, a crowdfunding platform that allows users to create and support various projects. This repository contains the frontend code for the FundWise application.

Visit the live application: [Fund Wise (Crowdfunding)](https://fundwise-frontend.vercel.app/)

Contract Repo: [FundWise Smart Contract](https://github.com/kritarthAviate/fundwise-smart-contract)

## Table of Contents

- [Set up](#set-up)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Future Scope](#future-scope)

## Set up

To get started with the FundWise project locally, follow these steps:

1. Clone the repository to your local machine.
2. Copy the contents of `.env.example` to a new file called `.env.local` and add the relevant API keys and environment variables.
3. Install the required dependencies by running the following commands:

```
$ yarn
$ yarn dev
```

The application should now be running locally on your machine.

## Tech Stack

FundWise is built using the following technologies:

- NextJS
- react-query
- Onboard.js
- ethers.js
- Alchemy
- IPFS
- Material UI

## Features

FundWise offers the following key features:

1. **Create Crowdfunding Project**: Users can create their crowdfunding projects with detailed descriptions and funding goals.

2. **Donate Funds**: Users can contribute funds to any active crowdfunding project of their choice.

3. **Withdraw Funds**: The project creator can withdraw funds once the goal is met.

4. **Refund Contributions**: In case a project fails to meet its funding goal or is marked as failed, all donors can withdraw their contributions.

5. **Claim NFT Certificate**: Upon successful completion of a project, users can claim an NFT certificate as proof of their contribution.

## Future Scope

We have exciting plans for FundWise's future development. Some of the upcoming features include:

- **My Certificates**: Users will have a dedicated section to view and manage their earned NFT certificates.

- **My Contributions**: A page that displays all the crowdfunding projects a user has contributed to.

- **Fundraisers Created by Me**: Users will be able to track and manage crowdfunding projects they have created.

- **Fundraiser for Me**: A personalized fundraising page for users to raise funds for their own projects.

- **Admin Portal**: An admin portal where FundWise or project creators can manage and mark projects as failed.

We are actively working on implementing these features to enhance your crowdfunding experience with FundWise.

Thank you for choosing FundWise for your crowdfunding needs! If you have any questions or feedback, please don't hesitate to reach out.

Happy crowdfunding! 🚀
