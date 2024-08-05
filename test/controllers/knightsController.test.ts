import request from "supertest";
import index from "../../src/index";
import Knight from "../models/knight";
import mongoose from "mongoose";

describe("GET /knights", () => {
  it("should return a list of knights", async () => {
    const response = await request(app).get("/knights");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Add more specific assertions based on your expected response
  });

  it("should filter knights by heroes", async () => {
    const response = await request(app).get("/knights?filter=heroes");
    expect(response.statusCode).toBe(200);
    // Assert that the response only contains knights that are heroes
  });
});

describe("GET /knights/:id", () => {
  it("should return a specific knight", async () => {
    const knightId = "123"; // Replace with a valid knight ID
    const response = await request(app).get(`/knights/${knightId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("age");
    // ... other properties
  });

  it("should return a 404 for an invalid ID", async () => {
    const response = await request(app).get("/knights/invalid");
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /knights", () => {
  it("should create a new knight", async () => {
    const newKnight = {
      // ... valid knight data
    };
    const response = await request(app).post("/knights").send(newKnight);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });

  it("should validate input data", async () => {
    // Test with invalid data, e.g., missing required fields
  });
});
