# Discipler App - API Plan

## First 3 Endpoints (MVP)

### 1. Plan Generation

**Endpoint:** `POST /plan/generate-local`
**Auth:** None (unauth)
**Purpose:** Generate personalized 7-day plan from quiz answers

**Request:**

```typescript
{
  quiz: QuizAnswers,
  duration_days: 7,
  time_budget_minutes: 5 | 15 | 30
}
```

**Response:**

```typescript
{
  planDays: PlanDay[],
  selection_result: {
    global_tier: "Intro" | "Growing" | "Deepening",
    chosen: Array<{
      habit: string,
      tier: string,
      why: string
    }>,
    scaffold: Array<{
      habit: string,
      tier: string,
      why: string
    }>
  }
}
```

**Implementation:**

- Use OpenAI API with Discipler metaprompt
- Cache responses for similar quiz combinations
- Fallback to static plans on API failure
- Rate limit: 10 requests per hour per IP

### 2. Plan Save

**Endpoint:** `POST /plan/save`
**Auth:** Required (user token)
**Purpose:** Save generated plan to user's account

**Request:**

```typescript
{
  planDays: PlanDay[],
  prompt_version: string,
  quiz_answers: QuizAnswers
}
```

**Response:**

```typescript
{
  plan_id: string,
  created_at: string,
  days_count: number
}
```

**Implementation:**

- Create plan record in `plans` table
- Create plan_items records in `plan_items` table
- Clear quiz localStorage after successful save
- Return plan_id for future reference

### 3. Daily Checkin

**Endpoint:** `POST /checkins`
**Auth:** Required (user token)
**Purpose:** Record daily completion and journal entry

**Request:**

```typescript
{
  plan_item_id: string,
  status: "done" | "missed",
  journal_text?: string,
  completed_at: string
}
```

**Response:**

```typescript
{
  checkin_id: string,
  streak_updated: boolean,
  new_streak: number,
  partner_notifications_sent: number
}
```

**Implementation:**

- Create checkin record in `checkins` table
- Calculate and update user streak
- Send notifications to partners
- Handle offline queue for retry

## Authentication Strategy

### Supabase Auth

- **Provider:** Email magic link (primary)
- **Fallback:** Apple Sign-In (iOS)
- **Session:** JWT tokens with 30-day expiry
- **Refresh:** Automatic token refresh

### Auth Flow

1. User completes quiz (unauth)
2. User signs up with email
3. Magic link sent to email
4. User clicks link → authenticated
5. Plan saved to user account
6. Continue to invite flow

## Error Handling

### Network Errors

- **Retry logic:** Exponential backoff (3 attempts)
- **Offline queue:** Queue changes when offline
- **User feedback:** Clear error messages with retry options

### Validation Errors

- **Client-side:** Real-time validation
- **Server-side:** Return specific error codes
- **User feedback:** Inline error messages

### Rate Limiting

- **Plan generation:** 10 requests/hour per IP
- **Checkins:** 10 requests/hour per user
- **Partner actions:** 5 requests/hour per user

## Future Endpoints (M1+)

### Partner Management

- `POST /invite` - Send partner invitations
- `POST /partner/accept` - Accept partner invitation
- `POST /partner/action` - Send encouragement/nudge

### User Profile

- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /settings` - Get user settings

### Analytics

- `GET /progress` - Get user progress stats
- `GET /streak` - Get current streak info
- `POST /analytics` - Track user actions

## Development Notes

### Local Development

- **Mock API:** Use local JSON files for development
- **Hot reload:** API changes trigger app reload
- **Debug mode:** Log all API requests/responses

### Testing Strategy

- **Unit tests:** Test API request/response parsing
- **Integration tests:** Test with mock Supabase
- **E2E tests:** Test complete user flows

### Performance Considerations

- **Caching:** Cache plan generation results
- **Compression:** Gzip API responses
- **CDN:** Use Supabase Edge Functions for global distribution
