# Artificial Alliance — V13.1

The approved V10.6 home design plus a new dedicated Samples page. Nothing has been published or connected to payment processing.

## Start here

- `index.html` — homepage, linked to the listening room.
- `samples/index.html` — dedicated Samples page.
- `samples/samples.css` — Samples page styling.
- `samples/samples.js` — sample player, waveform, interactive canvas, and page behavior.
- `samples/melodic-loops/index.html` — individual collection page prototype.
- `samples/melodic-loops/pack.css` — compact collection-page-specific styling.
- `samples/melodic-loops/pack-player.js` — working hero player using the three original synthetic interface demos until the real pack previews are ready.
- `assets/` — shared monogram, texture, art, and three original demo MP3s.

The pages are linked with **relative paths**, making the folder suitable for a static site such as GitHub Pages. You can open `index.html` directly or serve the folder from a local development server.

## Audio source note

The files in `assets/audio/` are short original, synthetic demo clips generated for testing the interface. They are **not** recordings by the site owner, and are **not** real product previews.

When your samples are ready:

1. Add/replace audio files in `assets/audio/`.
2. Edit the `tracks` and `meta` definitions at the start of `samples/samples.js` to update file paths, labels, descriptions, and waveform peak arrays.
3. Replace the temporary study disclosure and the in-progress collection copy with your actual release details.
4. Add commerce functionality separately when a real product can be purchased.

The player supports play/pause, switching tracks, waveform scrubbing, volume, looping, and keyboard-accessible controls. It does not automatically start audio.

## Design

V10.6 is the baseline. The page continues the midnight-indigо / chalk-white / lavender palette and the open editorial navigation language, with a distinct listening room on a warm-paper field and a darker first-collection section.

The main abstract artwork is code-drawn. It uses the synthesized demo's envelope to influence the filaments and reacts subtly to pointer movement. Motion respects the visitor's reduced-motion setting.


### V11.1 — Listening clarity
- Selecting a track starts playback immediately; tapping the playing track pauses it.
- The active track and playback state now have explicit affordances.
- Main transport has a label, the waveform has a seek hint, and the list has a purposeful heading.
- Updated brief intro copy to clarify that these are original *interface demo* sketches, not samples from a released pack.
- Preserved V11's design composition, color palette, and underlying audio files.


## V11.2 — Product directory
Home page's editorial directory now includes Samples, Software, Hardware, and Education, each as an accessible expandable row.
Samples includes a functional “Browse samples” link and a direct listening-room link in the feature section.
Other areas show accurate development status without broken browse destinations.
The Samples page and its audio player are unchanged from V11.1.


## V11.3 — About / philosophy and product directory
- Removed the large standalone Samples feature on the home page.
- Preserved **One Idea Leads to Another** as the concise About / philosophy chapter.
- Preserved a subtle final rule before the warm-paper-to-dark transition into **Explore the Work**.
- The directory still includes all four lanes (Samples, Software, Hardware, Education).
- Samples retains its working browse link to the unchanged listening-room page.
- The homepage header has a direct link to Samples as before.
- No other design or content changes.

## Working with GitHub

This repository is the shared source for the Artificial Alliance website.

- To receive changes made on GitHub, open this project in VS Code and run `git pull` (with local work committed or otherwise saved first).
- To publish local edits, commit them in VS Code, then push or Sync Changes.
- Use Live Server to preview `index.html`; it reloads when your local files change.

**Current version:** V13.1 moves listening into the pack-page hero and reduces the page to a concise concept, product details, and the existing ending. The V12 Samples catalog and approved V11.3 homepage remain unchanged.


## V12 — Samples storefront architecture
- The existing listening desk is now explicitly the **featured listening space**, currently populated with three original UI demo clips. They are not previews from a finished sample pack.
- The new **Archive** chapter below presents the first planned melodic synth-loop collection, with concept cover art and an expandable information section. No price, cart, or checkout is represented while the collection is unfinished.
- Future finished packs can use the `.pack-entry` markup pattern to extend the archive. Once release details and audio are ready, link each entry to its own detail page and enable a hosted checkout.
- The homepage stays unchanged from V11.3, including the four-area directory. All links use relative paths.


## V13 — Dedicated pack page + archive navigation
- The Melodic Loops entry in `samples/index.html` now lifts subtly on hover/focus and links to `samples/melodic-loops/`. The visible **View Collection** label and the artwork/info area share a full-card link target. The **Collection notes** disclosure remains independently interactive.
- The detail page introduces the concept, uses current working cover artwork, reserves a place for future audio previews, documents the planned release details, and links back to the archive. It **does not** claim the pack is finished, available for purchase, or represented by the existing UI-demo audio.
- The new page loads `../samples.css` for the shared header, typography, palette, and footer, then `pack.css` for the product-specific layout. It uses relative asset paths, so Live Server and static hosting work without a build step.
- To add a new pack later, copy the `samples/melodic-loops/` folder to a new slug, replace the copy and artwork, then link an archive entry to the new folder. When the catalog grows, replace hand-authored entries with a data-driven index.
- Before any launch, supply actual samples, complete metadata (format, loop count, license, preview audio, and price), verify audio rights, and connect a real hosted checkout/file-delivery platform. Do not publish simulated checkout actions.


## V13.1 — Listen first, scroll less
- Listening is integrated into the pack hero next to the prominent working cover artwork, rather than in a separate full-screen chapter.
- The compact player supports play/pause, track selection, scrubbing and looping. **Important: the three included MP3s are synthetic interface DEMOS, not part of the Melodic Loops pack.** The page explicitly labels them that way. Replace with actual owned/licensed sample previews before launch.
- Removed the standalone `The Sound` section and the separate chapter-navigation strip to reduce scrolling.
- Preserved the warm-paper `A Sound Worth Keeping` overview, shortened its writing, and used lightweight category tags there; technical specs remain in `Inside the Pack`.
- Kept the lavender `Inside the Pack` section but removed its dark availability box in favor of a small status row after concise facts.
- Preserved the existing `Keep Exploring` ending and `Keep Listening` footer, and left the homepage and archive unchanged.
- **Launch requirements:** replace demo audio; verify sample ownership/rights; confirm loop count, format, BPM/key, license, cover artwork, price and download/checkout. No customer purchase flow is active.
