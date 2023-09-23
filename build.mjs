import dts from 'bun-plugin-dts'
import path from 'node:path'

const output = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  plugins: [
    dts()
  ],
  target: 'node'
})

const XGO = path.join(process.env.HOME, 'go/bin/xgo');
const TARGETS = [
  'linux/arm64',
  'linux/amd64',
  'darwin/arm64',
  'darwin/amd64'
];

if (output.success) {
  console.log('Compiling native binaries...')
  const proc = Bun.spawn([
    XGO,
    "-go", "1.20.3",
    "-out", "release/bunbot",
    `--targets=${TARGETS}`,
    "-ldflags=-s -w",
    "-buildmode=c-shared",
    ".",
  ]);
  const text = await new Response(proc.stdout).text();
  console.log(text);
}
