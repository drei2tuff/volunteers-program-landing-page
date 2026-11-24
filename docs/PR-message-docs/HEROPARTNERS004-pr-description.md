# HEROPARTNERS004: Update Hero Banner and Partner Grid Styling

## Summary

Update the Bayanihang QC landing page hero to use the Palarong Pambansa 2027 banner and size it to the banner's 16:9 proportions. Simplify the partner logo grid by removing its panel treatment and cell dividers while retaining the existing logo layout.

## Changes

- Replace the previous hero image with the local `assets/palaro-banner.png` banner.
- Set the hero to a 16:9 aspect ratio on desktop and mobile so its dimensions follow the 1920 × 1080 source image.
- Center the hero image and remove the mobile fixed-height override that forced the banner to crop.
- Keep the existing hero shade and navigation layered over the banner.
- Remove the partner grid's outer border, rounded corners, and tinted background.
- Remove the partner cells' vertical and horizontal divider lines while preserving the three-column, two-row layout and centered logos.
- Add a specification documenting the banner sizing and partner grid appearance.

## Validation

- Not run as part of preparing this PR description.

## Reviewer Notes

- Check the hero image and navigation at desktop and mobile widths, including whether the 16:9 hero height fits the page design.
- Confirm the partner logos remain visually distinct and centered without grid dividers.
