const db = require('./data/db-config');
const server = require('./api/server');
const request = require('supertest');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
})

afterAll(async () => {
    await db.destroy();
})


describe('Todo Tests', () => {
    describe("Todo Server Test", () => {
        test("[1] Server çalışıyor mu", async () => {
            const res = await request(server).get("/");
            expect(res.status).toBe(200);
            expect(res.body.message).to('server is running')
        });
    })
    describe("Challange Test", () => {
        describe("GET", () => {
            test("[2] doğru challange status code dönüyor mu", async () => {
                const res = await request(server).get("/api/challanges");
                expect(res.status).toBe(200);
            })
            test("[3] Doğru sayıda challange geliyor mu", async () => {
                const res = await request(server).get("/api/challanges");
                expect(res.body.length).toBe(2);
            })
        });
        describe("GETBYID", () => {
            test("[4] id'ye göre doğru görev dönüyor mu", async () => {
                const res = await request(server).get("/api/challanges/1");
                expect(res.status).toBe(200);
                expect(res.body.challangeName).toBe('Challange Name 1');
            })
            test("[5] olmayan id girildiğinde, doğru hata mesajı geliyor mu", async () => {
                const res = await request(server).get("/api/challanges/3");
                expect(res.body.message).toBe("No challange");
            })
        });
        describe("INSERT", () => {
            test("[6] id'ye döre doğru ekleme yapıyor mu", async () => {
                let challangeExample = {
                    challangeName: "Challange Name 3",
                    challangeDetails: "Challange Details 3"
                }
                const res = await request(server).post("/api/challanges").send(challangeExample);
                expect(res.status).toBe(201);
                expect(res.body.challangeName).toBe('Challange Name 3');
            })
        });
    });
    describe("Task Test", () => {
        describe("GET", () => {
            test("[7] doğru task status code dönüyor mu", async () => {
                const res = await request(server).get("/api/tasks");
                expect(res.status).toBe(200);
            })
            test("[8] Doğru sayıda task geliyor mu", async () => {
                const res = await request(server).get("/api/task");
                expect(res.body.length).toBe(3);
            })
        });
        describe("GETBYID", () => {
            test("[9] id'ye göre doğru task dönüyor mu", async () => {
                const res = await request(server).get("/api/tasks/1");
                expect(res.status).toBe(200);
                expect(res.body.challangeName).toBe('Task Name 1');
            })
            test("[10] olmayan id girildiğinde, doğru hata mesajı geliyor mu", async () => {
                const res = await request(server).get("/api/tasks/3");
                expect(res.status).toBe(404);
                expect(res.body.message).toBe("There is no such task");
            })
        });
        describe("INSERT", () => {
            test("[11] id'ye göre doğru task ekliyor mu", async () => {
                let taskExample = {
                    taskName: "Task Name 4",
                    taskDetails: "Task Details 4",
                    taskDate: "18.03.2023",
                    challangeId: "2"
                  }
                const res = await request(server).post("/api/tasks").send(taskExample);
                expect(res.status).toBe(201);
                expect(res.body.challangeName).toBe('Task Name 4');
            })
            test("[12] name alanı eksik olunca doğru hata mesajı dönüyor mu", async () => {
                let taskExample = {
                    taskDetails: "Task Details 4",
                    taskDate: "18.03.2023",
                    challangeId: "2"
                  }
                const res = await request(server).post("/api/tasks").send(taskExample);
                expect(res.status).toBe(400);
                expect(res.body.challangeName).toBe('Please fill out the missing fields');
            })
        });
    });
})
