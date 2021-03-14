import request from "supertest";

const app = require('../src/app/server').default;

describe("GET Base Paths", () => {

  it("should have healthcheck", (done) => {
    request(app)
      .get("/healthcheck")
      .expect(200, done);
  });

  it("should have version", (done) => {
    request(app)
      .get("/server/version")
      .expect(200, done);
  });
});
