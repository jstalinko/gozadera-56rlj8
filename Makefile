.PHONY: flash

dev-android:
	bunx --bun ionic build && \
	bunx --bun ionic cap copy && \
	bunx --bun ionic capacitor sync android && \
	bunx --bun ionic cap open android

dev-ios:
	bunx --bun ionic build && \
	bunx --bun ionic cap copy && \
	bunx --bun ionic capacitor sync ios && \
	bunx --bun ionic cap open ios

dev-web:
	bunx --bun ionic serve