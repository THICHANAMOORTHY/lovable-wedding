<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- All wedding facts (names, date, time, venue) live in src/data/weddingDetails.ts; components read from it so details change in one place.

- Derive combined couple names and seal initials from weddingDetails exports; keep display order consistent without duplicating names.
- Uploaded portrait media uses a Lovable Assets pointer and a dedicated unframed portrait section so the original image remains intact.
- Keep the scratch-date overlay separate from wedding facts and provide a keyboard reveal control so scratching remains accessible.
