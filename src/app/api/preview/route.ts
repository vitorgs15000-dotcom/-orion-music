const SAMPLE_RATE = 8000;
const DURATION_SECONDS = 4;

function writeString(buffer: Buffer, offset: number, value: string) {
  buffer.write(value, offset, value.length, "ascii");
}

function createPreviewWav() {
  const samples = SAMPLE_RATE * DURATION_SECONDS;
  const pcm = Buffer.alloc(samples * 2);

  for (let index = 0; index < samples; index += 1) {
    const time = index / SAMPLE_RATE;
    const fadeIn = Math.min(1, index / (SAMPLE_RATE * 0.08));
    const fadeOut = Math.min(1, (samples - index) / (SAMPLE_RATE * 0.25));
    const envelope = fadeIn * fadeOut;
    const tone =
      Math.sin(2 * Math.PI * 220 * time) * 0.42 +
      Math.sin(2 * Math.PI * 330 * time) * 0.24 +
      Math.sin(2 * Math.PI * 440 * time) * 0.16;
    pcm.writeInt16LE(Math.max(-1, Math.min(1, tone * envelope)) * 32767, index * 2);
  }

  const header = Buffer.alloc(44);
  writeString(header, 0, "RIFF");
  header.writeUInt32LE(36 + pcm.length, 4);
  writeString(header, 8, "WAVE");
  writeString(header, 12, "fmt ");
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  writeString(header, 36, "data");
  header.writeUInt32LE(pcm.length, 40);

  return Buffer.concat([header, pcm]);
}

export async function GET() {
  return new Response(createPreviewWav(), {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "audio/wav"
    }
  });
}
