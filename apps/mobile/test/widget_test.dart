import 'package:flutter_test/flutter_test.dart';
import 'package:pantrypal_mobile/main.dart';

void main() {
  testWidgets('renders the mobile scaffold shell', (tester) async {
    await tester.pumpWidget(const PantryPalApp());

    expect(find.text('PantryPal mobile scaffold'), findsOneWidget);
  });
}
