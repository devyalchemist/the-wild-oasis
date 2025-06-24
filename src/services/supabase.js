import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lsypvxpptofjfakmrpnf.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzeXB2eHBwdG9mamZha21ycG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MzA4MjIsImV4cCI6MjA2NjAwNjgyMn0.0FFe14fc0WC0IX1DzHy68OjoCjw23IfozxOw87BCsNs";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
