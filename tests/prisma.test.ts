import { expect, it } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import { buildPrismaStore } from '../src/infrastructure/prisma-store.js';
import { buildPlayAGame } from '../src/domain/play-a-game.js';
import { fixtureCatalogue } from '../src/infrastructure/fixture-catalogue.js';
it('persiste vraiment une partie et la relit avec une nouvelle connexion',async()=>{
 const dir=mkdtempSync(resolve(tmpdir(),'imt-prisma-')); const url='file:'+resolve(dir,'test.db');
 const setup=spawnSync(process.execPath,['node_modules/prisma/build/index.js','db','push','--skip-generate'],{env:{...process.env,RUST_LOG:"info",DATABASE_URL:url},encoding:'utf8'});
 let client=new PrismaClient({datasources:{db:{url}}});
 try {
  expect(setup.status,setup.stderr).toBe(0);
  const store=buildPrismaStore(client); const play=buildPlayAGame(fixtureCatalogue,store);
  const result=await play({boardgameName:'Azul',players:['Alice','Bob']});
  await expect(play({boardgameName:'Azul',players:['Alice']})).rejects.toThrow();
  await client.$disconnect();
  client=new PrismaClient({datasources:{db:{url}}});
  expect(await buildPrismaStore(client).all()).toEqual([result]);
 } finally {await client.$disconnect();rmSync(dir,{recursive:true,force:true});}
},15000);
