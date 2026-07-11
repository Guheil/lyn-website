# Dashboard and public website connection

## 1. Use one MongoDB database

Both projects must point to the same database name. Collections used by the integration include:

- `properties`
- `brokers`
- `credentials`
- `inquiries`
- `contacts`
- `events`
- `tasks`
- `users`
- `sessions`
- `activity`
- `settings`
- `propertyMetrics`
- GridFS collections `media.files` and `media.chunks`

## 2. Use the same revalidation secret

Dashboard:

```env
PUBLIC_SITE_URL=https://your-public-site.example
REVALIDATION_SECRET=your-private-shared-secret
NEXT_PUBLIC_PUBLIC_SITE_URL=https://your-public-site.example
```

Public website:

```env
REVALIDATION_SECRET=your-private-shared-secret
```

After a property or credential is published, updated, hidden, or deleted, the dashboard asks the public website to refresh the affected pages.

## 3. Use correct application URLs

Dashboard:

```env
APP_URL=https://your-dashboard.example
```

Public website:

```env
APP_URL=https://your-public-site.example
```

These values are used for same-origin request protection. Do not leave localhost URLs in production.

## 4. Create the first administrator

```bash
npm run create-admin -- --name "Administrator Name" --email "admin@example.com"
```

The script asks for a password securely. Additional accounts can be created from **Dashboard access**. New accounts receive a temporary password that should be shared privately.

## 5. Test the connection

1. Add an active broker with a working contact method.
2. Add a property and upload at least one image.
3. Assign the broker and publish the property.
4. Open the public property page and confirm the image, availability, broker, phone, and email.
5. Submit the public inquiry form.
6. Confirm that the inquiry appears in the dashboard and is assigned to the property broker.
7. Add and publish a redacted credential.
8. Confirm that it appears on the public Credentials page.
9. Open a property page in a fresh browser session, then check Reports for the view count.
