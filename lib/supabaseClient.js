import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vmypfazaedqugjiivhed.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZteXBmYXphZWRxdWdqaWl2aGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTA0MjAsImV4cCI6MjA2MjI4NjQyMH0.5hD0KbWh4vgU-esNuEvJuG7n605LZJMxxbqgJtYexH4'

export const supabase = createClient(supabaseUrl, supabaseKey)
