const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    test("GET /cafes retorna status 200 y array con 1 objeto al menos", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("DELETE /cafes/:id retorna status 404 si el cafe no existe", async () => {
        const response = await request(server)
            .delete("/cafes/9999")
            .set("Authorization", "Bearer tokenValido");
        expect(response.status).toBe(404);
    });

    test("POST /cafes agrega un nuevo cafe y retorna status 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Cafe Expresso" };
        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(nuevoCafe)]));
    });

    test("PUT /cafes/:id retorna status 400 si el id del parametro y payload no coinciden", async () => {
        const cafeActualizado = { id: 10, nombre: "Café Latte" };
        const response = await request(server)
            .put("/cafes/2")
            .send(cafeActualizado);
        expect(response.status).toBe(400);
    });
});
