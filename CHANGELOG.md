# Database & Feature Updates - Based on User Feedback

## Overview

This changelog documents all changes made based on user feedback in `temuan.md`. All changes were made by editing existing migrations (no new migrations created).

## 1. Articles (formerly "Berita")

### Database Changes (`2025_10_31_080117_create_articles_table.php`)

- **REMOVED**: `category_id` foreign key constraint
- **ADDED**: `tags` JSON field (nullable) - supports multiple tags like WordPress
- Articles now support multiple tags instead of single category

### Model Updates (`app/Models/Article.php`)

- Removed `category()` relationship
- Added `tags` cast to array
- Tags are stored as JSON array in database

### Request Validation (`app/Http/Requests/ArticleRequest.php`)

- Removed `category_id` validation
- Added `tags` array validation
- Added WebP image format support

### Frontend Updates

- **Form** (`resources/js/pages/master/article/form.tsx`):
    - Replaced category dropdown with tags input field
    - Tags are comma-separated for easy input
    - Removed unused imports (MultiSelect, fetchCategory)
- **Types** (`resources/js/types/article.ts`):
    - Removed category relationship
    - Added `tags?: string[]` property

### Controller Updates

- Removed 'category' relation from all fetch operations
- Updated both Master and Public controllers

---

## 2. Events

### Database Changes (`2025_10_19_050949_create_events_table.php`)

- **REPLACED**: Single `date` field with:
    - `start_date` (date, required)
    - `end_date` (date, nullable) - for multi-day events
    - `start_time` (time, nullable)
    - `end_time` (time, nullable)
- **ADDED**: `is_completed` (boolean, default: false) - to mark finished events
- **ADDED**: Index on `['is_completed', 'start_date']` for efficient filtering

### Model Updates (`app/Models/Event.php`)

- Added casts for date fields and is_completed
- Added `scopeUpcoming()` - filters non-completed events
- Added `scopeCompleted()` - filters completed events

### Request Validation (`app/Http/Requests/EventRequest.php`)

- Replaced `date` with `start_date`, `end_date`, `start_time`, `end_time`
- Added validation: `end_date` must be after or equal to `start_date`
- Added `is_completed` boolean validation
- Added WebP image format support

### Frontend Updates

- **Form** (`resources/js/pages/master/event/form.tsx`):
    - Split date picker into Start Date and End Date
    - Added time input fields (Start Time and End Time)
    - Added "Mark event as completed" checkbox
- **Types** (`resources/js/types/event.ts`):
    - Updated to reflect new date/time structure
    - Added `is_completed: boolean`

### Controller Updates

- Updated sort fields to use `start_date` instead of `date`
- Added `is_completed` to sortable fields

---

## 3. Partners

### Database Changes (`2025_11_01_065130_create_partners_table.php`)

- **ADDED**: `order` (integer, default: 0) - for drag & drop sorting
- **ADDED**: Index on `order` field for efficient sorting

### Model Updates (`app/Models/Partner.php`)

- Added `order` cast to integer
- Added `scopeOrdered()` - automatically orders by order field

### Request Validation (`app/Http/Requests/PartnerRequest.php`)

- Added `order` integer validation (min: 0)
- Added WebP image format support

### Frontend Updates

- **Form** (`resources/js/pages/master/partner/form.tsx`):
    - Added "Display Order" number input field
    - Added helper text about drag & drop capability
- **Types** (`resources/js/types/partner.ts`):
    - Added `order: number` property

### Controller Updates

- Added `order` to sortable fields

---

## 4. Categories (No Changes Required)

The categories table already has a `type` field (default: 'product') which allows separation between:

- Product categories (shown as icons on homepage)
- Article tags (managed separately via JSON field)

This solves the feedback: "Category berita saat ini sama dengan category produk"

---

## 5. Global Updates

### Image Support

All models now support **WebP format** in addition to jpeg, png, jpg, gif, and svg:

- Articles thumbnails
- Events thumbnails
- Partners logos

### Factory Updates

Updated all factories with realistic test data:

- `ArticleFactory`: Generates articles with random tags
- `EventFactory`: Generates events with dates, times, and completion status
- `PartnerFactory`: Generates partners with sequential ordering

---

## Migration Instructions

To apply these changes to your database:

1. **Fresh migration** (recommended for development):

    ```bash
    php artisan migrate:fresh --seed
    ```

2. **Or manually run migrations**:

    ```bash
    php artisan migrate:rollback --step=4
    php artisan migrate
    ```

3. **Update frontend dependencies** (if needed):
    ```bash
    npm install
    npm run build
    ```

---

## Notes for Frontend Implementation

### Articles

- Tags are stored as JSON array: `["Berita", "Pelatihan", "Pengumuman"]`
- Display tags as badges/chips on article cards
- Allow filtering by tags on article index page

### Events

- Display date range: "15 Nov 2025 - 17 Nov 2025" if end_date exists
- Display time range: "09:00 - 17:00" if times exist
- Show completed events with gray overlay or at the bottom of the list
- Filter options: "Upcoming" vs "Completed"

### Partners

- Implement drag & drop reordering in the admin panel
- Save new order on drop using AJAX
- Display partners ordered by `order` field ascending

---

## CSS/Styling Considerations

### Paragraphs Spacing

The feedback mentioned: "Jarak antar paragraf, dikasih space agar lebih mudah terbaca"

Add this CSS for article/event content:

```css
.prose p + p {
    margin-top: 1.25em;
}

.prose ul,
.prose ol {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
}
```

---

## Additional Feedback Items (For Future Implementation)

These items from `temuan.md` require frontend/UX work beyond database changes:

1. **Article/Event Content**:
    - ✅ Paragraph spacing (CSS update needed)
    - ✅ Bullet points display (check RichTextEditor configuration)

2. **Partners**:
    - 🔄 Drag & drop reordering (requires JS implementation)
    - 🔄 Save issue fix (verify form submission logic)
    - 🔄 Logo size reduction (CSS: make grid 8 columns instead of current)

3. **Event Display**:
    - 🔄 Add "Contact to Join" button
    - 🔄 Gray out completed events in listing

---

## Testing Checklist

- [ ] Articles can be created with multiple tags
- [ ] Events can be created with date ranges and times
- [ ] Events can be marked as completed
- [ ] Partners can be ordered numerically
- [ ] WebP images upload successfully
- [ ] Article tags display correctly on frontend
- [ ] Event date/time ranges display correctly
- [ ] Completed events are visually distinct
- [ ] Partners display in correct order

---

_Last Updated: November 15, 2025_
