import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  // Cameras
  const [vault, shopA, entrance] = await Promise.all([
    prisma.camera.create({ data: { name: "Vault Camera", location: "Vault" } }),
    prisma.camera.create({ data: { name: "Shop Floor Camera A", location: "Shop Floor" } }),
    prisma.camera.create({ data: { name: "Entrance Camera", location: "Entrance" } }),
  ]);

  // Incidents (timestamps throughout a 24-hour window)
  const now = new Date("2025-07-21T00:00:00");
  const hour = 60 * 60 * 1000;

  const types = [
    { type: "Unauthorised Access", img: "/img1.png" },
    { type: "Gun Threat", img: "/img2.png" },
    { type: "Face Recognised", img: "/img3.png" }
  ];

  let incidents = [];
  for (let i = 0; i < 12; i++) {
    const cam = [vault, shopA, entrance][i % 3];
    const typeDef = types[i % 3];
    incidents.push({
      cameraId: cam.id,
      type: typeDef.type,
      tsStart: new Date(now.getTime() + i * hour),
      tsEnd: new Date(now.getTime() + i * hour + 5 * 60 * 1000),
      thumbnailUrl: typeDef.img,
      resolved: i % 4 === 0, // 3/4 start unresolved
    });
  }
  
  await prisma.incident.createMany({ data: incidents });
  
  console.log('Seed data created successfully!');
}

main()
  .catch((e) => { 
    console.error(e); 
    process.exit(1); 
  })
  .finally(() => prisma.$disconnect());