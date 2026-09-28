import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();

const PORT = process.env.PORT || 5000;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  }),
);

app.use(express.json());

if (!GOOGLE_PLACES_API_KEY) {
  console.warn("WARNING: GOOGLE_PLACES_API_KEY is missing from .env.local");
}

/**
 * Find the Dr.Kleen Google Place ID.
 */
async function findDrKleenPlace() {
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.googleMapsUri",
      },
      body: JSON.stringify({
        textQuery:
          "Dr Kleen Cleaning Hygiene Fumigation Pest Control Lagos Nigeria",
        maxResultCount: 5,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google place search failed: ${response.status} ${errorText}`,
    );
  }

  const data = await response.json();

  if (!data.places || data.places.length === 0) {
    throw new Error("Dr.Kleen Google Business listing was not found.");
  }

  return data.places[0];
}

app.get("/api/test-google", async (_req, res) => {
  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask": "places.id,places.displayName",
        },
        body: JSON.stringify({
          textQuery: "Dr Kleen Lagos Nigeria",
          maxResultCount: 1,
        }),
      },
    );

    const text = await response.text();

    console.log("Google status:", response.status);
    console.log("Google response:", text);

    return res.status(response.status).send(text);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

/**
 * Get the actual reviews for a Place ID.
 */
async function getPlaceDetails(placeId) {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Google place details failed: ${response.status} ${errorText}`,
    );
  }

  return response.json();
}

/**
 * Convert Google's review response
 * into the Review interface already used
 * by CustomerReviewsSection.tsx.
 */
function normalizeReview(review, index) {
  const ratingMap = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  const rating = ratingMap[review.rating] ?? Number(review.rating) ?? 5;

  const authorName = review.authorAttribution?.displayName || "Google customer";

  const authorPhoto = review.authorAttribution?.photoUri || undefined;

  const authorUri = review.authorAttribution?.uri || undefined;

  const reviewText = review.originalText?.text || review.text?.text || "";

  return {
    id: review.name || review.googleMapsUri || `google-review-${index}`,

    name: authorName,

    avatar: authorPhoto,

    rating,

    comment: reviewText,

    date: review.publishTime || undefined,

    source: "google",

    url: review.googleMapsUri || authorUri || undefined,
  };
}

/**
 * Main reviews endpoint.
 */
app.get("/api/google-reviews", async (_req, res) => {
  try {
    if (!GOOGLE_PLACES_API_KEY) {
      return res.status(500).json({
        error: "Google Places API key is not configured.",
      });
    }

    const place = await findDrKleenPlace();

    console.log(`Google Place found: ${place.displayName?.text || "Unknown"}`);

    console.log(`Place ID: ${place.id}`);

    const details = await getPlaceDetails(place.id);

    const reviews = (details.reviews || []).map(normalizeReview);

    const rating = Number(details.rating || 0);

    const count = Number(details.userRatingCount || 0);

    return res.json({
      success: true,

      business: {
        id: details.id,
        name: details.displayName?.text || "Dr.Kleen",
        googleMapsUri: details.googleMapsUri || place.googleMapsUri,
      },

      rating,

      count,

      reviews,
    });
  } catch (error) {
    console.error("Google Reviews Error:", error);

    return res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to retrieve Google reviews.",
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Dr.Kleen backend is running.",
  });
});

app.listen(PORT, () => {
  console.log(`Dr.Kleen backend running at http://localhost:${PORT}`);
});
