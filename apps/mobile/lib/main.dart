import 'package:flutter/material.dart';

void main() {
  runApp(const PantryPalApp());
}

class PantryPalApp extends StatelessWidget {
  const PantryPalApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PantryPal',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF3D6C4A)),
        scaffoldBackgroundColor: const Color(0xFFF6F1E8),
      ),
      home: const Scaffold(
        body: SafeArea(
          child: Center(
            child: Text('PantryPal mobile scaffold'),
          ),
        ),
      ),
    );
  }
}
