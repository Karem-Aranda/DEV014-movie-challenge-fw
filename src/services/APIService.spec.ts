jest.mock("./constants", () => ({ ApiKey: "mocked-token" }));

describe("API Service test", () => {});

//cuando corres jest no se esta corriendo la app como tal, se esta corriendo otra app simulada, variable de entorno se tiene que simular(mockear) en donde se este usando apikey
//para que pueda acceder a ellas
