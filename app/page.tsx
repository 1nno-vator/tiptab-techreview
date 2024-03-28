import NotesPicker from '@/components/NotePicker'
import Notes from '@/components/Notes'

export default function Home() {
  return (
    <main className="w-full min-h-screen pb-10">
      <NotesPicker />
      <Notes />
    </main>
  )
}
