# Migration Guide - Database Updates

## ⚠️ Important Notice

All database migrations have been updated. You need to reset your database to apply these changes.

## Quick Start

### Option 1: Fresh Migration (Recommended for Development)

This will drop all tables and recreate them:

```bash
# Run migrations from scratch with seeders
php artisan migrate:fresh --seed
```

### Option 2: Rollback & Migrate

If you want to keep some data:

```bash
# Rollback the affected migrations
php artisan migrate:rollback --step=4

# Run migrations again
php artisan migrate
```

## Frontend Build

After database migration, rebuild your frontend assets:

```bash
# Install dependencies (if needed)
npm install

# Build for production
npm run build

# Or run development server
npm run dev
```

## What Changed?

### ✅ Articles (Berita → Artikel)

- Now uses **tags** instead of single category
- Supports multiple tags per article (like WordPress)
- Tags: Berita, Pelatihan, Pengumuman, Kegiatan, etc.

### ✅ Events

- **Date range**: start_date + end_date (for multi-day events)
- **Time range**: start_time + end_time
- **Completion status**: Mark events as done
- Better for scheduling and displaying event duration

### ✅ Partners

- **Ordering**: Added `order` field for custom sorting
- Prepare for drag & drop functionality
- Display partners in your preferred order

### ✅ Image Support

- All forms now accept **WebP** format
- Better compression and quality

## Verification Steps

After migration, verify:

1. **Articles**:
    - Can create article with tags
    - Tags display as array in database
    - Form shows tag input (comma-separated)

2. **Events**:
    - Can set start/end date and time
    - Can mark event as completed
    - Completed events can be filtered

3. **Partners**:
    - Can set display order
    - Partners sort by order field

## Database Backup (Optional but Recommended)

Before running migrations, backup your data:

```bash
# For SQLite
cp database/database.sqlite database/database.sqlite.backup

# For MySQL
mysqldump -u username -p database_name > backup.sql
```

## Troubleshooting

### Issue: "Table already exists"

```bash
# Drop all tables and start fresh
php artisan migrate:fresh
```

### Issue: Foreign key constraint errors

```bash
# Disable foreign key checks temporarily
php artisan migrate:fresh --force
```

### Issue: Frontend not updating

```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Rebuild frontend
npm run build
```

## Next Steps (Frontend Implementation Needed)

These features are ready in the backend but need frontend work:

1. **Article tags display**: Show tags as badges/chips
2. **Event date/time formatting**: Display "15-17 Nov, 09:00-17:00"
3. **Completed events styling**: Gray out or separate completed events
4. **Partner drag & drop**: Implement reordering UI
5. **Paragraph spacing**: Add CSS for better readability

Refer to `CHANGELOG.md` for detailed documentation.

---

**Need help?** Check `CHANGELOG.md` for complete list of changes.
