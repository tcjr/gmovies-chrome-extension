#!/bin/bash

set -e

DOJOVERSION="1.6.1"

THISDIR=$(cd $(dirname $0) && pwd)
SRCDIR="$THISDIR/../src"
UTILDIR="$SRCDIR/js/dojo-release-${DOJOVERSION}-src/util/buildscripts"
PROFILE="$THISDIR/../profiles/ext.js"
BUILDDIR="$THISDIR/../tempbuild"
EXTDIR="$THISDIR/../dist"

if [ ! -d "$UTILDIR" ]; then
  echo "Can't find Dojo build tools -- did you run ./util/setup.sh?"
  exit 1
fi

if [ ! -f "$PROFILE" ]; then
  echo "Invalid input profile"
  exit 1
fi

echo "Using $PROFILE. JS will be built to the staging dir, then copied to the extension dir."

# clean the old distribution files
rm -rf "$BUILDDIR"
rm -rf "$EXTDIR"
mkdir "$EXTDIR"

# i know this sucks, but sane-er ways didn't seem to work ... :(
cd "$UTILDIR"
./build.sh profileFile=../../../../../profiles/ext.js releaseDir=../../../../../tempbuild/
cd "$THISDIR"

# copy js files to extension
cp "$BUILDDIR/js/dojo/dojo.js" "$EXTDIR/dojo.js"
cp "$BUILDDIR/js/ext/base.js.uncompressed.js" "$EXTDIR/gmovies-extension.js"
#cp "$BUILDDIR/js/ext/base.js" "$EXTDIR/gmovies-extension.js"

# copy the manifest
# todo: transform for production?
cp "$SRCDIR/manifest.json" "$EXTDIR/manifest.json"


