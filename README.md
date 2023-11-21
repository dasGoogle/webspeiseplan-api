<div align="center">
    <h1>Webspeiseplan API</h1>
</div>

A proxy-server for accessing the unofficial mensa API for the Studentenwerk Potsdam.

**[Running instance and API documentation](https://mensa.aaronschlitt.de)**

## History

Until 2020, the Studentenwerk (StW) provided machine-readable data for meals and usage information for all of their canteens.

In fall of 2023, however, this system was replaced with a new web-based application. It has a number of shortcomings, among them no API documentation.

This project aims to provide a well-documented API that is generated from the RPC interface provided by the webspeiseplan website.

## Deployment

If you want to run this application yourself, there are docker containers available [here](https://github.com/dasGoogle/webspeiseplan-api/pkgs/container/webspeiseplan-api/).

Feel free to use the `docker-compose.yaml` file as a base for your setup.

## Development setup

To get started, clone this repository and change your working directory to the repository.

Then install dependencies using

```bash
npm i
```

Afterwards, you can start the build process by running

```bash
npm run build
```

And start the server using

```bash
npm run start
```
